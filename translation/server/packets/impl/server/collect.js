const Packet = require('./../../packet.js');

const self = class collect extends Packet {
    name = 'collect'
    decode(data) {
        return {
            collectedEntityId: data.readUInt16LE(1),
            collectorEntityId: 99999
        };
    }
};

module.exports = new self();