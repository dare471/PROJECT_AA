export type FavoriteClientInfo = {
	id: number

	clientId: number
	clientName: string
	clientBin: number
	clientAddress: string

	meetingType: { id: number; name: string }[]
	meetingPlace: { id: number; name: string }[]
}
