const Packet = require('./../../packet.js');

const self = class entity_remove extends Packet {
    name = 'entity_remove'
    decode(data) {
        return {
            id: data.readUInt16LE(1),
        };
    }
};

module.exports = new self();