const Packet = require('./../../packet.js');

const self = class chat extends Packet {
    name = 'chat'
    encode(data) {
        const buffer = Buffer.alloc(2 + data.length);
        buffer.writeUInt8(data.length, 1);
        buffer.write(data, 2, 'utf8');
        return buffer;
    }
};

module.exports = new self();