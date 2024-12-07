const Packet = require('./../../packet.js');
const { translateText } = require('./../../../utils.js');

const self = class title extends Packet {
    name = 'title'
    decode(data) {
        const titlelen = data.readUInt8(3);
        const subtitlelen = data.readUInt8(4);
        const dur = data.readUInt16LE(1);
        return {
            title: JSON.stringify({text: translateText(data.toString('utf8', 5, 5 + titlelen))}),
            subtitle: JSON.stringify({text: translateText(data.toString('utf8', 5 + titlelen, 5 + titlelen + subtitlelen))}),
            duration: dur
        };
    }
};

module.exports = new self();