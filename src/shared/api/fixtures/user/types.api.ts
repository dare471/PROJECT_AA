export interface User {
	id: number
	guid: string
	telegramId: number
	fullName: string
	direction: string
	position: string
	email: string
	subDivision: string
	crmCato: number | null
}

export interface UserMapHistory {
	id: number
	userId: number
	clientId: number
	clientName: string
	regionId: number
	regionName: string
	plotId: number
	plotName: string | null
}

export interface UserContract {
	contractGuid: string
	managerId: number
	managerName: string
	managerPosition: string
	contractName: string
	contractDirection: string
	contractClientId: number
	contractClientName: string
	contractClientIin: number
	contractSeason: string
	contractConditionPay: string
	contractTypeDelivery: string
	contractDeliveryAddress: string
	contractSum: number
}

export interface UserClient {
	clientId: number
	clientName: string
	clientAddress: string
	clientIinBin: number
	clientType: string
}

export interface UserRegion {
	id: number
	regionId: number
	name: string
}
