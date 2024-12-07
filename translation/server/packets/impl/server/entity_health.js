const Packet = require('../../packet.js');

const self = class entity_health extends Packet {
    name = 'entity_health'
    decode(data) {
        return {
            id: data.readUInt16LE(1),
            hp: data.readFloatLE(3)
        };
    }
};

module.exports = new self();