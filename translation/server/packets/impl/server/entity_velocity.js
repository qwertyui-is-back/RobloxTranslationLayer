const Packet = require('../../packet.js');

const self = class entity_velocity extends Packet {
    name = 'entity_velocity'
    decode(data) {
        return {
            entityId: 99999,
            velocityX: data.readInt16LE(1),
            velocityY: data.readInt16LE(3),
            velocityZ: data.readInt16LE(5)
        };
    }
};

module.exports = new self();