const Packet = require('../../packet.js');

const self = class tablist extends Packet {
    name = 'tablist'
    decode(data) {
        let players = [], offset = 2;
        for (let i = 0; i < data.readUint8(1); i++) {
            const nameSize = data.readUint8(offset + 3);
            const prefixSize = data.readUint8(offset + 2);
            players.push({
                id: data.readUint8(offset),
                local: data.readUint8(offset + 1) == 1,
                prefix: data.toString('utf8', offset + 40 + nameSize, offset + 40 + nameSize + prefixSize),
                uuid: data.toString('utf8', offset + 4, offset + 40),
                name: data.toString('utf8', offset + 40, offset + 40 + nameSize),
                ping: 0
            })
            offset += 40 + nameSize + prefixSize;
        }
        return {players: players};
    }
};

module.exports = new self();