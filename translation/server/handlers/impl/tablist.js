const Handler = require('./../handler.js');
const { translateText } = require('./../../utils.js');
const SKINS = require('./../../types/skins.js');
let client, socket, entities;

const self = class TabListHandler extends Handler {
	roblox(rbSocket) {
		socket = rbSocket;
		socket.on('tablist', packet => {
			let lists = [[], [], [], [], []], exists = {};
			for (const entry of packet.players) {
				let name = entry.name.slice(0, 16);
				if (entry.local) name = client.username;
				const uuid = entry.local ? client.uuid : entry.uuid;
				const skin = entry.local ? SKINS.granddad : SKINS.bacon;
				const prefix = translateText(entry.prefix ?? '').slice(0, 16);
				const suffix = '';
				const gamemode = entities.gamemodes[entry.id] ?? 0;
				let oldTab = this.tabs[entry.id];
				this.entries[entry.id] = uuid;
				this.tabs[entry.id] = {
					prefix: prefix,
					suffix: suffix,
					ping: entry.ping,
					gamemode: gamemode
				};
				exists[entry.id] = true;

				let addTeam = !oldTab;
				if (oldTab) {
					if (gamemode != oldTab.gamemode) lists[1].push({UUID: uuid, gamemode: gamemode});
					if (entry.ping != oldTab.ping) lists[2].push({UUID: uuid, ping: entry.ping});
					if (prefix != oldTab.prefix || suffix != oldTab.suffix) {
						addTeam = true;
						client.write('scoreboard_team', {
							team: uuid.slice(0, 16),
							mode: 1
						});
					}
				} else {
					lists[0].push({
						UUID: uuid,
						name: name,
						properties: [{name: 'textures', value: skin[0], signature: skin[1]}],
						gamemode: gamemode,
						ping: entry.ping
					});
				}

				if (addTeam) {
					client.write('scoreboard_team', {
						team: uuid.slice(0, 16),
						mode: 0,
						name: uuid.slice(0, 32),
						prefix: prefix,
						suffix: suffix,
						friendlyFire: true,
						nameTagVisibility: 'all',
						color: 0,
						players: [name]
					});
				}
			}

			for (const entry of Object.keys(this.entries)) {
				if (!exists[entry]) {
					lists[4].push({UUID: this.entries[entry]});
					delete this.entries[entry];
					delete this.tabs[entry];
				}
			}

			for (let i = 0; i < lists.length; i++) {
				let list = lists[i];
				if (list.length <= 0) continue;
				client.write('player_info', {
					action: i,
					data: list
				});
				if (i == 0 || i == 4) entities.checkAll();
			}

			client.write('playerlist_header', {
				header: JSON.stringify({text: '\u00A7bYou are playing on \u00A7abedwars.com'}),
				footer: JSON.stringify({text: '\u00A76Translation layer made by 7GrandDad'})
			});
		});
	}
	minecraft(mcClient) {
		client = mcClient;
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		socket = requeue ? socket : undefined;
		if (requeue && client) {
			let data = [];
			Object.values(this.entries).forEach((uuid) => {
				data.push({UUID: uuid});
				client.write('scoreboard_team', {
					team: uuid.slice(0, 16),
					mode: 1
				});
			})
			client.write('player_info', {
				action: 4,
				data: data
			});
		}
		this.entries = {};
		this.tabs = {};
	}
	obtainHandlers(handlers) {
		entities = handlers.entity;
	}
};

module.exports = new self();