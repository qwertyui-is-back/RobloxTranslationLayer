const Packet = require('./../../packet.js');

const self = class speed extends Packet {
    name = 'speed'
    decode(data) {
        return data.readFloatLE(1);
    }
};

module.exports = new self();