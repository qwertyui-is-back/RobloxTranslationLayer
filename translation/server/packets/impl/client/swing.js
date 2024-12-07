const Packet = require('../../packet.js');

const self = class swing extends Packet {
    name = 'swing'
    encode(data) {
        return Buffer.alloc(1);
    }
};

module.exports = new self();