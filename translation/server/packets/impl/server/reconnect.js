const Packet = require('./../../packet.js');

const self = class reconnect extends Packet {
    name = 'reconnect'
};

module.exports = new self();