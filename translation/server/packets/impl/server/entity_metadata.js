const { createItem } = require('../../../utils.js');
const ITEMS = require('../../../types/items.js');
const Packet = require('../../packet.js');

const self = class entity_metadata extends Packet {
    name = 'entity_metadata'
    decode(data) {
        const type = data.readUInt8(6);
        let value;

        switch (type) {
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                const id = data.readUInt16LE(7);
                const customId = data.readUInt8(10);

                if (customId > 0) {
                    value = createItem(ITEMS[customId], data.readInt8(9));
                } else {
                    value = id != 0 ? createItem({id: id >> 4, damage: id & 15}, data.readInt8(9)) : {blockId: -1};
                }
                break;
            case 6:
                break;
            case 7:
                break;
            default:
                value = data.readInt8(7);
                break;
        }

        return {
            entityId: data.readUInt32LE(1),
            metadata: [{key: data.readUInt8(5), type: type, value: value}]
        };
    }
};

module.exports = new self();