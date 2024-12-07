const Packet = require('../../packet.js');

const self = class break_block extends Packet {
    name = 'break_block'
    encode(data) {
        const buffer = Buffer.alloc(14);
        buffer.writeUInt8(data.status, 1);
        buffer.writeInt32LE(data.location.x, 2);
        buffer.writeInt32LE(data.location.y, 6);
        buffer.writeInt32LE(data.location.z, 10);
        return buffer;
    }
};

module.exports = new self();