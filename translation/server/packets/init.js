module.exports = {
	CLIENT: [
		require('./impl/client/attack.js'),
		require('./impl/client/login.js'),
		require('./impl/client/move.js'),
		require('./impl/client/place.js'),
		require('./impl/client/switch_slot.js'),
		require('./impl/client/swing.js'),
		require('./impl/client/inventory.js'),
		require('./impl/client/break_block.js'),
		require('./impl/client/chat.js'),
		require('./impl/client/close_window.js')
	],
	SERVER: [
		require('./impl/server/entity_spawn.js'),
		require('./impl/server/entity_remove.js'),
		require('./impl/server/entity_move.js'),
		require('./impl/server/entity_status.js'),
		require('./impl/server/entity_animation.js'),
		require('./impl/server/entity_equipment.js'),
		require('./impl/server/entity_health.js'),
		require('./impl/server/entity_effect.js'),
		require('./impl/server/entity_remove_effect.js'),
		require('./impl/server/entity_metadata.js'),
		require('./impl/server/entity_velocity.js'),
		require('./impl/server/collect.js'),
		require('./impl/server/chunk.js'),
		require('./impl/server/explosion.js'),
		require('./impl/server/lightning.js'),
		require('./impl/server/block_update.js'),
		require('./impl/server/break_anim.js'),
		require('./impl/server/world_particles.js'),
		require('./impl/server/teleport.js'),
		require('./impl/server/health.js'),
		require('./impl/server/respawn.js'),
		require('./impl/server/reconnect.js'),
		require('./impl/server/login.js'),
		require('./impl/server/kick.js'),
		require('./impl/server/tablist.js'),
		require('./impl/server/window_items.js'),
		require('./impl/server/open_window.js'),
		require('./impl/server/chat.js'),
		require('./impl/server/title.js'),
		require('./impl/server/play_sound.js'),
		require('./impl/server/scoreboard.js'),
		require('./impl/server/speed.js'),
		require('./impl/server/combined.js')
	]
};

module.exports.CLIENT = module.exports.CLIENT.sort((a, b) => a.name > b.name ? 1 : -1);
module.exports.SERVER = module.exports.SERVER.sort((a, b) => a.name > b.name ? 1 : -1);
module.exports.CLIENT = Object.fromEntries(module.exports.CLIENT.map((packet, id) => {
	const original = packet.encode;
	return [packet.name, function(...args) {
		const data = original(...args);
		data.writeUInt8(id, 0);
		return data;
	}];
}));