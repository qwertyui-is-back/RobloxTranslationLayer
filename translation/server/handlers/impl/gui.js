const Handler = require('./../handler.js');
const { CLIENT } = require('./../../packets/init.js');
let client, socket;

const self = class GuiHandler extends Handler {
	roblox(rbSocket) {
		socket = rbSocket;
		socket.on('window_items', packet => {
			client.write('window_items', {
				windowId: packet.windowId,
				items: packet.slots
			});
			client.write('set_slot', {
				windowId: -1,
				slot: 0,
				item: {blockId: -1}
			});
		});
		socket.on('open_window', packet => client.write('open_window', packet));
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('window_click', packet => socket.send(CLIENT.inventory(packet.windowId, Number.parseInt(packet.slot), packet.mode, packet.mouseButton)));
		client.on('close_window', () => socket.send(CLIENT.close_window(true)));
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
	}
};

module.exports = new self();