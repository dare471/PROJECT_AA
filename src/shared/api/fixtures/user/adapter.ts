import type { User, UserMapHistory } from './types'

interface _User {
	guid: string
	id: number
	telegramId: number
	fullName: string
	direction: string
	position: string
	email: string
	subDivision: string
	crmCato: number | null
}

interface _UserMapHistory {
	id: number
	userId: number
	regionName: string
	regionId: number
	clientName: string
	clientId: number
	clientPlotName: string | null
	clientPlotId: number
}

export function userAdapter(userInfo: _User): User {
	return {
		guid: userInfo.guid,
		id: userInfo.id,
		telegramId: userInfo.telegramId,
		fullName: userInfo.fullName,
		direction: userInfo.direction,
		position: userInfo.position,
		email: userInfo.email,
		subDivision: userInfo.subDivision,
		crmCato: userInfo.crmCato,
	}
}

export function userMapHistoriesAdapter(mapHistories: _UserMapHistory[]): UserMapHistory[] {
	return mapHistories.map((mapHistory) => ({
		id: mapHistory.id,
		userId: mapHistory.userId,
		regionName: mapHistory.regionName,
		regionId: mapHistory.regionId,
		clientName: mapHistory.clientName,
		clientId: mapHistory.clientId,
		plotName: mapHistory.clientPlotName,
		plotId: mapHistory.clientPlotId,
	}))
}
