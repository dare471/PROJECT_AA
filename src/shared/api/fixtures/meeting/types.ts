export interface AddPlannedMeeting {
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
	date: string
	status: string
	meetingClients: MeetingClient[]
}

export type MeetingClient = {
	id: number
	name: string
	iin: number
	address: string
	meetingType: string
	meetingTypeId: number
	meetingId: number
	meetingName: string
	meetingTime: string | null
	plotId: number
}
