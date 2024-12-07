const Packet = require('./../../packet.js');

const self = class break_anim extends Packet {
    name = 'break_anim'
    decode(data) {
        return {
            entityId: 0,
            destroyStage: data.readUint8(1),
            location: {
                x: data.readInt32LE(2),
                y: data.readInt32LE(6),
                z: data.readInt32LE(10)
            }
        };
    }
};

module.exports = new self();