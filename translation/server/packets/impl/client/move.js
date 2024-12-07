const Packet = require('../../packet.js');

const self = class move extends Packet {
    name = 'move'
    encode(data) {
        const buffer = Buffer.alloc(21);
        buffer.writeFloatLE(data.pos.x, 1);
        buffer.writeFloatLE(data.pos.y, 5);
        buffer.writeFloatLE(data.pos.z, 9);
        buffer.writeFloatLE(data.yaw, 13);
        buffer.writeFloatLE(data.pitch, 17);
        return buffer;
    }
};

module.exports = new self();