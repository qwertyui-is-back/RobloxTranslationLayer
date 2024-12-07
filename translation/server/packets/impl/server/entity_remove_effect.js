const Packet = require('../../packet.js');

const self = class entity_remove_effect extends Packet {
    name = 'entity_remove_effect'
    decode(data) {
        return {
            entityId: data.readUInt32LE(1),
            effectId: data.readUInt8(5)
        };
    }
};

module.exports = new self();