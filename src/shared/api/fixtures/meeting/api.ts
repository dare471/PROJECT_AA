import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { plannedMeetingsAdapter } from './adapter'
import type { AddPlannedMeeting, PlannedMeeting } from './types'

const instance = axios.create({
	baseURL: `${envVars.API_URL}/api`,
})

export const addPlannedMeetingsMutation = createEffect<
	{ userId: number; meetingsDate: string; meetings: AddPlannedMeeting[] },
	boolean
>(async ({ userId, meetingsDate, meetings }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'addDateToVisit',
			dateToVisit: meetingsDate,
			userId,
			properties: meetings.map((meeting) => ({
				clientId: meeting.clientId,
				typeVisit: meeting.meetingType,
				placeMeeting: meeting.meetingPlace,
				coordinate: meeting.point,
				plotId: meeting.plotId,
				duration: meeting.officeDuration,
				distance: meeting.officeDistance,
			})),
		},
	})

	return req.status === 200
})

export const plannedMeetingsQuery = createEffect<{ userId: number }, PlannedMeeting[]>(async ({ userId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'plannedMeeting',
			userId,
		},
	})

	if (req.status === 200) {
		return plannedMeetingsAdapter(req.data)
	}

	throw new Error('status is not 200')
})
