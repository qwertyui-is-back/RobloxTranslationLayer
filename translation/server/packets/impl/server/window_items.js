const Packet = require('../../packet.js');
const { createItem } = require('../../../utils.js');
const ITEMS = require('../../../types/items.js');

const self = class window_items extends Packet {
    name = 'window_items'
    decode(data) {
        let slots = [];

        for (let i = 0; i < data.readInt8(2); i++) {
            const offset = 3 + (i * 4);
            const id = data.readUInt16LE(offset);
            const customId = data.readUInt8(offset + 3);

            if (customId > 0) {
                slots.push(createItem(ITEMS[customId], data.readInt8(offset + 2)));
            } else {
                slots.push(id != 0 ? createItem({id: id >> 4, damage: id & 15}, data.readInt8(offset + 2)) : {blockId: -1});
            }
        }

        return {
            windowId: data.readUInt8(1),
            slots: slots
        };
    }
};

module.exports = new self();