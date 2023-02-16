export type PlannedMeetingMockup = {
	clientId: number
	meetingType: number
	meetingPlace: number
	plotId: number | null
	point: number[] | null
	officeDuration: number | null
	officeDistance: number | null
}

export type PlannedMeeting = {
	id: number
	dateToVisit: string
	statusVisit: string
	clients: PlannedMeetingClient[]
}

export type PlannedMeetingClient = {
	clientId: number
	clientName: string
	clientIin: number
	clientAddress: string
	visitName: string
	visitId: number
	meetingId: number
	meetingTime: string | null
	meetingName: string
	plotId: number
}
