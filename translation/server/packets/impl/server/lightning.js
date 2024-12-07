const Packet = require('../../packet.js');

const self = class lightning extends Packet {
    name = 'lightning'
    decode(data) {
        return {
            entityId: data.readUInt16LE(1),
            type: 1,
            x: data.readInt32LE(3),
            y: data.readInt32LE(7),
            z: data.readInt32LE(11)
        };
    }
};

module.exports = new self();