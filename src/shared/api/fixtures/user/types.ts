export type UserInfo = {
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

export interface UserSelectClient {
	id: number
	meetingType: Array<{
		id: number
		name: string
	}>
	meetingPlace: Array<{
		id: number
		name: string
	}>
	clientId: number
	clientName: string
	clientIin: number
	clientAddress: string
}

export interface UserPlannedMeeting {
	id: number
	dateToVisit: string
	statusVisit: string
	clients: Array<{
		clientId: number
		clientName: string
		clientIin: number
		clientAddress: string
		visitName: string
		visitId: number
		meetingId: number
		meetingName: string
		plotId: number
	}>
}
