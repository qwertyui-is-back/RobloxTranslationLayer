const Packet = require('./../../packet.js');

const self = class combined extends Packet {
	name = 'combined'
	decode(data) {
		let offset = 3;
        let packets = [];

        for (let i = 0; i < data.readUInt16LE(1); i++) {
            const length = data.readUInt16LE(offset);
            packets.push(data.slice(offset + 2, offset + length + 2));
            offset += length + 2;
        }

		return packets;
	}
};

module.exports = new self();