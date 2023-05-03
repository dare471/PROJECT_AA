import axios from 'axios'
import { createEffect } from 'effector'

import { envVars } from '~src/shared/config'

import { MeetingAdapter } from './adapter'
import type {
	AddPlannedMeeting,
	MeetingContractComplicationRef,
	MeetingDetails,
	MeetingPlotInspectRef,
	MeetingRecommendRef,
	MeetingServiceRef,
	PlannedMeeting,
} from './types.api'

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
			action: 'getMeeting',
			userId,
		},
	})

	if (req.status === 200) {
		return MeetingAdapter.fromApiToPlannedMeetings(req.data)
	}

	throw new Error('status is not 200')
})

export const plannedMeetingDetailsQuery = createEffect<{ meetingId: number }, MeetingDetails>(async ({ meetingId }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'plannedMeetingMob',
			action: 'getDetailMeeting',
			visitId: meetingId,
		},
	})

	if (req.status === 200) return MeetingAdapter.fromApiToPlannedMeetingDetails(req.data)

	throw new Error('status is not 200')
})

export const meetingServicesQuery = createEffect<void, MeetingServiceRef[]>(async () => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'meetingSurvey',
			action: 'getHandBookWorkDone',
		},
	})

	if (req.status === 200) return req.data

	throw new Error('status is not 200')
})

export const meetingPlotInspectsRefsQuery = createEffect<void, MeetingPlotInspectRef[][]>(async () => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'meetingSurvey',
			action: 'getHandBookFieldInsp',
		},
	})

	if (req.status === 200) return MeetingAdapter.fromApiToMeetingPlotInspectsRefs(req.data)

	throw new Error('status is not 200')
})

export const meetingContractComplicationsRefsQuery = createEffect<void, MeetingContractComplicationRef[]>(async () => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'meetingSurvey',
			action: 'getHandBookContractComplications',
		},
	})

	if (req.status === 200) return req.data

	throw new Error('status is not 200')
})

export const meetingRecommendsRefsQuery = createEffect<void, MeetingRecommendRef[]>(async () => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'meetingSurvey',
			action: 'getHandBookMeetingRecommendations',
		},
	})

	if (req.status === 200) return req.data

	throw new Error('status is not 200')
})

export const meetingSurveyMutation = createEffect<
	{
		visitId: number
		providedServices: number[]
		plotInspects: { inspectionTypeId: number; id: number }[]
		contractComplications: number[]
		recommends: { recomendationTypeId: number; description: string }[]
	},
	boolean
>(async ({ visitId, providedServices, plotInspects, contractComplications, recommends }) => {
	const req = await instance({
		method: 'POST',
		url: '/manager/workspace',
		data: {
			type: 'meetingSurvey',
			action: 'fixedSurvey',
			visitId: visitId,
			workDone: providedServices,
			fieldInspection: plotInspects,
			contractComplication: contractComplications,
			recomendation: recommends,
		},
	})

	if (req.status === 200) return true

	return false
})
