const Packet = require('./../../packet.js');

const self = class login extends Packet {
    name = 'login'
};

module.exports = new self();