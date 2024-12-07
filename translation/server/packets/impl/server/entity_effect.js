const Packet = require('../../packet.js');

const self = class entity_effect extends Packet {
    name = 'entity_effect'
    decode(data) {
        return {
            entityId: data.readUInt32LE(1),
            effectId: data.readUint8(5),
            amplifier: data.readInt8(6),
            duration: 32767,
            hideParticles: false
        };
    }
};

module.exports = new self();