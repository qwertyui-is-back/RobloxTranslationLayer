const Packet = require('../../packet.js');

const self = class place extends Packet {
    name = 'place'
    encode(data) {
        const buffer = Buffer.alloc(14);
        buffer.writeInt32LE(data.location.x, 1);
        buffer.writeInt32LE(data.location.y, 5);
        buffer.writeInt32LE(data.location.z, 9);
        buffer.writeInt8(data.direction, 13);
        return buffer;
    }
};

module.exports = new self();