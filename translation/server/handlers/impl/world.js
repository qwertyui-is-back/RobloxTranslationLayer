const Handler = require('./../handler.js');
const { CLIENT } = require('./../../packets/init.js');
const Chunk = require('prismarine-chunk')('1.8.9');
const Vec3 = require('vec3');
const CELL_VOLUME = 16 * 16 * 16;
let client, socket, entity, gui;

let lightData = new Chunk();
for (let x = 0; x < 16; x++) {
	for (let z = 0; z < 16; z++) {
		for (let skyY = 0; skyY < 256; skyY++) {
			lightData.setSkyLight(new Vec3(x, skyY, z), 15);
		}
	}
}
lightData = lightData.dump();

function getBlockIndex(x, y, z) {
	return (y & 15) << 8 | (z & 15) << 4 | x & 15
}

const self = class WorldHandler extends Handler {
	createChunk(packet) {
		if (packet.cells.length <= 0) return {getMask: function() { return 0; }, dump: function() { return []; }};
		const chunk = new Chunk();
		chunk.load(lightData);
		for (const cell of packet.cells) {
			const array = cell.bitArray;
			if (!array) continue;
			for (let x = 0; x < 16; x++) {
				for (let y = 0; y < 16; y++) {
					for (let z = 0; z < 16; z++) {
						const offset = array[getBlockIndex(x, y, z)];
						if (offset == 0) continue;
						const blockdata = packet.palette[offset - 1], vec = new Vec3(x, cell.y + y, z);
						chunk.setBlockType(vec, blockdata >> 4);
						chunk.setBlockData(vec, blockdata & 15);
					}
				}
			}
		}
		return chunk;
	}
	isLoaded(x, z) {
		return this.chunks.includes([Math.floor(x / 16), Math.floor(z / 16)].join());
	}
	isEntityLoaded(entity) {
		return this.isLoaded((entity.pos.x / 32), (entity.pos.z / 32));
	}
	roblox(rbSocket) {
		socket = rbSocket;
		socket.on('chunk', packet => {
			const chunk = this.createChunk(packet), chunkInd = [packet.x, packet.z].join();
			const chunkData = chunk.dump();
			if (chunkData.length > 0) {
				this.chunks.push(chunkInd);
			} else {
				const ind = this.chunks.indexOf(chunkInd);
				if (ind != -1) this.chunks.splice(ind, 1);
			}
			client.write('map_chunk', {
				x: packet.x,
				z: packet.z,
				groundUp: true,
				bitMap: chunk.getMask(),
				chunkData: chunkData
			});
			entity.checkAll(client);
		});
		socket.on('block_update', packet => client.write('block_change', packet));
		socket.on('play_sound', packet => client.write('named_sound_effect', packet));
		socket.on('break_anim', packet => client.write('block_break_animation', packet));
		socket.on('explosion', packet => client.write('explosion', packet));
		socket.on('world_particles', packet => client.write('world_particles', packet));
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('block_place', packet => {
			socket.send(CLIENT.place(packet));
		});
		client.on('block_dig', packet => socket.send(CLIENT.break_block(packet)));
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		this.chunks = [];
	}
	obtainHandlers(handlers) {
		entity = handlers.entity;
		gui = handlers.gui;
	}
};

module.exports = new self();