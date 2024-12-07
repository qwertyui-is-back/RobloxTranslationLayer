const Packet = require('./../../packet.js');

const self = class attack extends Packet {
    name = 'attack'
    encode(data) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt8(data, 1);
        return buffer;
    }
};

module.exports = new self();