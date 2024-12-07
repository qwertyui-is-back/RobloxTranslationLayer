const Packet = require('../../packet.js');

const self = class entity_animation extends Packet {
    name = 'entity_animation'
    decode(data) {
        return {
            entityId: data.readUInt16LE(1),
            animation: data.readUint8(3)
        };
    }
};

module.exports = new self();