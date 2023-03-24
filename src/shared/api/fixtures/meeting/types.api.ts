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

export type MeetingDetails = {
	client: {
		clientId: number
		clientName: string
		address: string
		clientIin: number
		startVisit: string
		finishVisit: string
		statusVisit: boolean
		visitTypeId: number
		meetingTypeId: number
		meetingCoordinate: number[] | null
		plotId: number
		duration: number | null
		distance: number | null
	}
	contractComplications:
		| {
				id: number
				name: string
		  }[]
		| null
	providedServices:
		| {
				id: number
				name: string
		  }[]
		| null
	recommends:
		| {
				id: number
				name: string
				description: string
		  }[]
		| null
	plotInspects:
		| {
				id: number
				name: string
				category: number
				description: string
		  }[]
		| null
}

export type MeetingServiceRef = {
	id: number
	name: string
}

export type MeetingPlotInspectRef = {
	id: number
	name: string
	categoryId: number
	category: string
}

export type MeetingContractComplicationRef = {
	id: number
	name: string
}

export type MeetingRecommendRef = {
	id: number
	name: string
}
