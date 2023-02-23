import type { MeetingClient, PlannedMeeting } from './types'

interface _PlannedMeeting {
	id: number
	dateToVisit: string
	statusVisit: string
	clients: _MeetingClient[]
}

interface _MeetingClient {
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

export function plannedMeetingsAdapter(plannedMeetings: _PlannedMeeting[]): PlannedMeeting[] {
	return plannedMeetings.map((plannedMeeting) => ({
		id: plannedMeeting.id,
		date: plannedMeeting.dateToVisit,
		status: plannedMeeting.statusVisit,
		meetingClients: meetingClientsAdapter(plannedMeeting.clients),
	}))
}

export function meetingClientsAdapter(meetingsClients: _MeetingClient[]): MeetingClient[] {
	return meetingsClients.map((meetingClient) => ({
		id: meetingClient.clientId,
		name: meetingClient.clientName,
		iin: meetingClient.clientIin,
		address: meetingClient.clientAddress,
		meetingType: meetingClient.visitName,
		meetingTypeId: meetingClient.visitId,
		meetingId: meetingClient.meetingId,
		meetingName: meetingClient.meetingName,
		meetingTime: meetingClient.meetingTime,
		plotId: meetingClient.plotId,
	}))
}
