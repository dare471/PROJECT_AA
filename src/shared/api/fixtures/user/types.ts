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
