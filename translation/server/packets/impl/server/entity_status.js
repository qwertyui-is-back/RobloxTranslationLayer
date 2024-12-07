const Packet = require('../../packet.js');

const self = class entity_status extends Packet {
    name = 'entity_status'
    decode(data) {
        return {
            entityId: data.readInt32LE(1),
            entityStatus: data.readInt8(5)
        };
    }
};

module.exports = new self();