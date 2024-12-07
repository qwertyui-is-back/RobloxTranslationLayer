const Packet = require('./../../packet.js');
const { translateText } = require('./../../../utils.js');

const self = class chat extends Packet {
    name = 'chat'
    decode(data) {
        return {
            message: JSON.stringify({text: translateText(data.toString('utf8', 3, data.readInt16LE(1) + 3))})
        };
    }
};

module.exports = new self();