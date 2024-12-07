const Packet = require('./../../packet.js');

const self = class close_window extends Packet {
    name = 'close_window'
    encode(data) {
        return Buffer.alloc(1);
    }
};

module.exports = new self();