const Packet = require('../../packet.js');

const self = class switch_slot extends Packet {
    name = 'switch_slot'
    encode(data) {
        const buffer = Buffer.alloc(2);
        buffer.writeUInt8(data, 1);
        return buffer;
    }
};

module.exports = new self();