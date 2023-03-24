import type { User, UserMapHistory } from '../types.api'
import type { _User, _UserMapHistory } from './types.adapter'

export class UserAdapter {
	public static fromApiToUser(data: _User): User {
		return {
			guid: data.guid,
			id: data.id,
			telegramId: data.telegramId,
			fullName: data.fullName,
			direction: data.direction,
			position: data.position,
			email: data.email,
			subDivision: data.subDivision,
			crmCato: data.crmCato,
		}
	}

	public static fromApiToMapHistories(data: _UserMapHistory[]): UserMapHistory[] {
		return data.map((item) => ({
			id: item.id,
			userId: item.userId,
			regionName: item.regionName,
			regionId: item.regionId,
			clientName: item.clientName,
			clientId: item.clientId,
			plotName: item.clientPlotName,
			plotId: item.clientPlotId,
		}))
	}
}
