const Packet = require('../../packet.js');

const self = class entity_move extends Packet {
    name = 'entity_move'
    decode(data) {
        return {
            id: data.readUInt16LE(1),
            pos: {
                x: data.readInt32LE(3) - 1.5,
                y: data.readInt32LE(7) - 2,
                z: data.readInt32LE(11) - 1.5
            },
            yaw: data.readInt8(15),
            onGround : data.readInt8(16) == 1
        };
    }
};

module.exports = new self();