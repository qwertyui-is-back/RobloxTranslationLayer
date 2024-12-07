module.exports = {
    translateText: function(str) {
        str = str.replaceAll('/c/', '\u00a7');
        str = str.replaceAll('/check/', '✔');
        str = str.replaceAll('/shield/', '✪');
        str = str.replaceAll('/xmark/', '✘');
        return str;
    },
    createItem: function(data, count) {
        let item = {
            blockId: data.id,
            itemCount: count,
            itemDamage: data.damage ?? 0,
            nbtData: {
                type: 'compound',
                name: '',
                value: {
                    Unbreakable: { type: 'byte', value: 1 }
                }
            }
        };

        if (data.name) {
            item.nbtData.value.display = {
                type: 'compound',
                value: {
                    Name: { type: 'string', value: '\u00a7r' + data.name }
                }
            };
        }

        if (data.enchants) {
            let enchants = [];

            for (const ench of data.enchants) {
                enchants.push({
                    lvl: { type: 'short', value: ench[1] },
                    id: { type: 'short', value: ench[0] }
                });
            }

            item.nbtData.value.ench = {
                type: 'list',
                value: {
                    type: 'compound',
                    value: enchants
                }
            }
        }

        return item;
    }
}