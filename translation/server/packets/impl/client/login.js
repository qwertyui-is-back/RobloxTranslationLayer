const Packet = require('../../packet.js');

const self = class login extends Packet {
    name = 'login'
    encode(data) {
        return Buffer.alloc(1);
    }
};

module.exports = new self();