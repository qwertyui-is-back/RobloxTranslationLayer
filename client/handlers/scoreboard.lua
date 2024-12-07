local players = game:GetService('Players')
local lplr = players.LocalPlayer
local replicatedStorage = game:GetService('ReplicatedStorage')
local KnitClient = require(replicatedStorage.rbxts_include.node_modules["@easy-games"].knit.src).KnitClient
local ClientStore = require(lplr.PlayerScripts.TS.ui.store).ClientStore
local current = os.date('*t')
local send
local utils

local handler = {}

function handler:start(main)
	self:registerPackets(main)
	send = main.send
	utils = main.utils

	self.scoreboardUpdate = task.spawn(function()
		repeat
			handler:updateScoreboard()
			task.wait(1)
		until false
	end)
end

function handler:updateScoreboard()
	local state = ClientStore:getState()
	local title = '/c/e/c/l'
	local current = os.date('*t')
	local lines = {}

	if state.Game.queueType then
		lines = {'/c/7'..current.month..'/'..current.day..'/'..tostring(current.year):sub(3, 4)..'/c/7 m4415s', ' '}
		if state.Game.queueType:find('bedwars') then
			title ..= 'BEDWARS'
			for _, team in state.Game.teams or {} do
				local alive = 0
				local bed = state.Bedwars.teamBedStatus[team.id]
				local rTeam = KnitClient.Controllers.TeamController:getTeam(team.id) or {members = {}}
				for _, member in rTeam.members do
					alive += state.Bedwars.finalDeaths[member.userId] and 0 or 1
				end

				local status = (bed ~= 'bed_broken' and alive > 0 and '/c/a'..(bed == 'bed_alive' and '/check/' or '/shield/') or alive > 0 and '/c/a'..alive or '/c/c/xmark/')
				status ..= state.Game.myTeam and team.id == state.Game.myTeam.id and '/c/7 YOU' or ''
				table.insert(lines, utils:translateColor(team.color)..team.name:sub(1, 1)..'/c/r '..team.name..': '..status)
				if #lines >= 10 then continue end
			end
		elseif state.Game.queueType:find('skywars') then
			title ..= 'SKYWARS'
			local alive = 0
			for _, plr in players:GetPlayers() do
				alive += plr:GetAttribute('Team') and not plr:GetAttribute('Spectator') and 1 or 0
			end

			table.insert(lines, 'Players left: /c/a'..alive)
			table.insert(lines, '  ')
			table.insert(lines, 'Kills: /c/a'..(state.Bedwars.kills[lplr.UserId] or 0))
			table.insert(lines, '   ')
			table.insert(lines, 'Map: /c/aNone')
			table.insert(lines, 'Mode: /c/cInsane')
		else
			title ..= 'CUSTOM'
		end
	else
		title ..= 'BEDWARS'
	end

	table.insert(lines, '')
	table.insert(lines, '/c/ebedwars.com')
	send('scoreboard', title, lines)
end

function handler:registerPackets(main)
	main:registerServerPacket('scoreboard', function(title, lines)
		local amount = #title
		local offset = 3 + amount
		for _, v in lines do
			amount += #v + 1
		end

		local data = buffer.create(4 + amount)
		buffer.writeu8(data, 1, #title)
		buffer.writeu8(data, 2, #lines)
		buffer.writestring(data, 3, title)
		for _, v in lines do
			buffer.writeu8(data, offset, #v)
			buffer.writestring(data, offset + 1, v)
			offset += #v + 1
		end
		return data
	end)
end

return handler