const mc = require('minecraft-protocol');
const ws = require('ws');
const handlers = require('./translation/server/handlers/init.js');
const packets = require('./translation/server/packets/init.js');
const server = mc.createServer({
	'online-mode': false,
	motd: '\u00a76' + ' '.repeat(14) + 'Bedwars Translation Layer \u00a7c[1.8]\n\u00a7a' + ' '.repeat(21) + 'Made by 7GrandDad',
	favicon: 'data:image/png;base64,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',
	maxPlayers: 1,
	keepAlive: true,
	version: '1.8.9'
});
const wsServer = new ws.Server({
	port: 6874,
	skipUTF8Validation: true,
	handleProtocols: (protocols, client) => {
        console.log(protocols, client);
    }
});
const VERSION = '1.0.0';
let connected, lSocket, client, joined, skipKick = Date.now();

function cleanup(teleport) {
	connected = teleport ?? false;
	joined = false;
	Object.values(handlers).forEach((handler) => handler.cleanup(teleport));
}

async function connect(requeue) {
	skipKick = false;
	if (requeue) {
		client.write('respawn', {
			dimension: 1,
			difficulty: 2,
			gamemode: 2,
			levelType: 'FLAT'
		});
		client.write('respawn', {
			dimension: 0,
			difficulty: 2,
			gamemode: 2,
			levelType: 'FLAT'
		});
		cleanup(true);
		await new Promise((resolve) => {
			let loop;
			loop = setInterval(() => {
				if (client.ended || lSocket != undefined) {
					clearInterval(loop);
					resolve();
				}
			}, 100);
		});
		if (client.ended || lSocket == undefined) return;
	}

	Object.values(handlers).forEach((handler) => handler.roblox(lSocket));

	lSocket.on('reconnect', () => skipKick = true);
	lSocket.on('login', () => {
		if (!joined && client != undefined) {
			joined = true;
			lSocket.send(packets.CLIENT.login());
		}
	});

	lSocket.on('combined', function(data) {
		for (const msg of data) {
			const packet = packets.SERVER[msg.readInt8(0)];
			if (packet) lSocket.emit(packet.name, packet.decode(msg));
		}
	});

	lSocket.on('message', function(msg) {
		const packet = packets.SERVER[msg.readInt8(0)];
		if (packet) lSocket.emit(packet.name, packet.decode(msg));
	});
}

wsServer.on('connection', function(socket) {
	if (lSocket) {
		socket.terminate();
		return;
	}
	lSocket = socket;

	socket.on('close', function() {
		if (socket == lSocket) {
			lSocket = undefined;
			if (skipKick) {
				connect(true);
			} else if (client) {
				client.end('Disconnected');
			}
		}
	});
});

server.on('playerJoin', async function(mcClient) {
	if (connected) {
		mcClient.end('A player is already logged in!');
		return;
	}

	mcClient.on('end', function() {
		if (lSocket) {
			lSocket.close();
			lSocket = undefined;
		}
		cleanup();
		client = undefined;
		connected = false;
	});

	if (!lSocket) {
		mcClient.end('Missing game client, please make sure the game is running.');
		return;
	}

	client = mcClient;
	client.write('login', {
		entityId: 99999,
		gameMode: 0,
		dimension: 0,
		difficulty: 2,
		maxPlayers: server.maxPlayers,
		levelType: 'default',
		reducedDebugInfo: false,
		keepInventory: true
	});

	Object.values(handlers).forEach((handler) => handler.minecraft(client));

	await connect(client);
	connected = !client.ended;
});

Object.values(handlers).forEach((handler) => handler.obtainHandlers(handlers));
console.log('\x1b[33mRoblox Bedwars Translation Layer Started!\nDeveloped & maintained by 7GrandDad (https://youtube.com/c/7GrandDadVape)\nVersion: ' + VERSION + '\x1b[0m');