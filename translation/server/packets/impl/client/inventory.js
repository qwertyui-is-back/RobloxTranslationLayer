const Packet = require('./../../packet.js');

const self = class inventory extends Packet {
    name = 'inventory'
    encode(id, slot, mode, mouseButton) {
        const buffer = Buffer.alloc(5);
        buffer.writeUInt8(id, 1);
        buffer.writeUInt8(slot == -999 ? 255 : slot, 2);
        buffer.writeUInt8(mode, 3);
        buffer.writeUInt8(mouseButton, 4);
        return buffer;
    }
};

module.exports = new self();