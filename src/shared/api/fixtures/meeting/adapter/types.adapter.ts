export interface _PlannedMeeting {
	id: number
	dateToVisit: string
	statusVisit: string
	clients: _MeetingClient[]
}

export interface _MeetingClient {
	clientId: number
	clientName: string
	clientIin: number
	clientAddress: string
	visitId: number
	visitTypeName: string
	visitTypeId: number
	meetingTypeId: number
	meetingTime: string | null
	meetingTypeName: string
	plotId: number
}

export interface _MeetingDetails {
	clientObj: {
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
	}[]
	contractComplication:
		| {
				id: string
				name: string
		  }[]
		| null
	workDone:
		| {
				id: string
				name: string
		  }[]
		| null
	recomend:
		| {
				id: string
				name: string
				description: string
		  }[]
		| null
	fieldsInsp:
		| {
				id: string
				name: string
				category: string
				description: string
		  }[]
		| null
}
