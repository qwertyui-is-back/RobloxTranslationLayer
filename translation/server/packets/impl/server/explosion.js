const Packet = require('./../../packet.js');

const self = class explosion extends Packet {
    name = 'explosion'
    decode(data) {
        return {
            x: data.readFloatLE(1),
            y: data.readFloatLE(5),
            z: data.readFloatLE(9),
            radius: 10,
            affectedBlockOffsets: [],
            playerMotionX: 0,
            playerMotionY: 0,
            playerMotionZ: 0
        };
    }
};

module.exports = new self();