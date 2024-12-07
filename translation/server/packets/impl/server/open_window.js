const Packet = require('./../../packet.js');

const self = class open_window extends Packet {
    name = 'open_window'
    decode(data) {
        return {
            windowId: data.readUInt8(1),
            inventoryType: data.toString('utf8', 7, 7 + data.readUInt8(2)),
            windowTitle: JSON.stringify({translate: 'container.chest'}),
            slotCount: data.readUInt8(2),
            entityId: data.readUInt32LE(3)
        };
    }
};

module.exports = new self();