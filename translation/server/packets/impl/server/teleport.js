const Packet = require('../../packet.js');

const self = class teleport extends Packet {
    name = 'teleport'
    decode(data) {
        return {
            x: data.readFloatLE(1),
            y: data.readFloatLE(5),
            z: data.readFloatLE(9),
            yaw: data.readFloatLE(13),
            pitch: 0,
            flags: 0
        };
    }
};

module.exports = new self();