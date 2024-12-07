const Packet = require('../../packet.js');

const self = class world_particles extends Packet {
    name = 'world_particles'
    decode(data) {
        return {
            particleId: data.readInt32LE(1),
            longDistance: data.readUInt8(5) == 1,
            x: data.readFloatLE(6),
            y: data.readFloatLE(10),
            z: data.readFloatLE(14),
            offsetX: data.readFloatLE(18),
            offsetY: data.readFloatLE(22),
            offsetZ: data.readFloatLE(26),
            particleData: data.readFloatLE(30),
            particles: data.readInt32LE(34),
            data: []
        };
    }
};

module.exports = new self();