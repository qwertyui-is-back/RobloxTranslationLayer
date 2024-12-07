const Packet = require('./../../packet.js');
const { translateText } = require('./../../../utils.js');

const self = class kick extends Packet {
    name = 'kick'
    decode(data) {
        return {
            reason: JSON.stringify({text: translateText(data.toString('utf8', 3, data.readInt16LE(1) + 3))})
        };
    }
};

module.exports = new self();