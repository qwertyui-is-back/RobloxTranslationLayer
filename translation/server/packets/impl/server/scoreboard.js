const Packet = require('./../../packet.js');

const self = class scoreboard extends Packet {
    name = 'scoreboard'
    decode(data) {
        const titleSize = data.readUInt8(1);
        let lines = [];
        let offset = titleSize + 3;

        for (let i = 0; i < data.readUInt8(2); i++) {
            const lineSize = 1 + data.readUInt8(offset);
            lines.push(data.toString('utf8', offset + 1, offset + lineSize));
            offset += lineSize;
        }

        return {
            title: data.toString('utf8', 3, titleSize + 3),
            content: lines
        };
    }
};

module.exports = new self();