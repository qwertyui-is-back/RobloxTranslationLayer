const Packet = require('./../../packet.js');

const self = class health extends Packet {
    name = 'health'
    decode(data) {
        return {
            hp: data.readFloatLE(1),
            food: 19,
            foodSaturation: 0
        };
    }
};

module.exports = new self();