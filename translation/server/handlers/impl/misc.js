const Handler = require('./../handler.js');
const { CLIENT } = require('../../packets/init.js');
let client, socket, entity, connect;

const self = class ChatHandler extends Handler {
	roblox(rbSocket) {
		socket = rbSocket;
		socket.on('chat', packet => client.write('chat', packet));
		socket.on('kick', packet => client.write('kick_disconnect', packet));
		socket.on('title', packet => {
			client.write('title', {
				action: 2,
				fadeIn: 0,
				stay: packet.duration,
				fadeOut: 0
			});
			client.write('title', {
				action: 0,
				text: packet.title
			});
			client.write('title', {
				action: 1,
				text: packet.subtitle
			});
		});
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('chat', packet => {
			socket.send(CLIENT.chat(packet.message));
		});
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
	}
	obtainHandlers(handlers, connectFunction) {
		connect = connectFunction;
		entity = handlers.entity;
	}
};

module.exports = new self();