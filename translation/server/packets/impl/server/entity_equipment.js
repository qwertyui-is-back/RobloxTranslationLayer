const Packet = require('../../packet.js');
const { createItem } = require('../../../utils.js');
const ITEMS = require('../../../types/items.js');

const self = class entity_equipment extends Packet {
    name = 'entity_equipment'
    decode(data) {
        const itemId = data.readUInt16LE(4);
        const customId = data.readUInt8(7);
        let item;

        if (customId > 0) {
            item = createItem(ITEMS[customId], data.readInt8(6));
        } else {
            item = itemId != 0 ? createItem({id: itemId >> 4, damage: itemId & 15}, data.readInt8(6)) : {blockId: -1};
        }

        return {
            entityId: data.readUint16LE(1),
            slot: data.readUint8(3),
            item: item
        };
    }
};

module.exports = new self();