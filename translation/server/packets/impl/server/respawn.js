const Packet = require('./../../packet.js');

const self = class respawn extends Packet {
    name = 'respawn'
};

module.exports = new self();