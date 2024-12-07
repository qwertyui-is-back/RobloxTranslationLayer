const Packet = require('../../packet.js');

const self = class entity_spawn extends Packet {
    name = 'entity_spawn'
    decode(data) {
        return {
            id: data.readUInt16LE(1),
            type: data.readInt8(3),
            yaw: data.readInt8(16),
            pos: {
                x: data.readInt32LE(4),
                y: data.readInt32LE(8),
                z: data.readInt32LE(12)
            }
        };
    }
};

module.exports = new self();