export interface _User {
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

export interface _UserMapHistory {
	id: number
	userId: number
	regionName: string
	regionId: number
	clientName: string
	clientId: number
	clientPlotName: string | null
	clientPlotId: number
}
