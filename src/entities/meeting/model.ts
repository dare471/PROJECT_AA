import { attach, createStore } from 'effector'

import { meetingApi, type MeetingDetails, type MeetingPlotInspectRef, type MeetingServiceRef } from '~src/shared/api'
import { type MeetingContractComplicationRef, type MeetingRecommendRef } from '~src/shared/api'

export function createMeetingDetails() {
	const $meetingDetails = createStore<MeetingDetails | null>(null)
	const $meetingsDetailsPending = createStore<boolean>(false)

	const getMeetingDetailsFx = attach({ effect: meetingApi.plannedMeetingDetailsQuery })

	$meetingsDetailsPending.on(getMeetingDetailsFx.pending, (_, pending) => pending)
	$meetingDetails.on(getMeetingDetailsFx.doneData, (_, meetingDetails) => meetingDetails)

	return {
		getMeetingDetailsFx,
		$meetingDetails,
		$meetingsDetailsPending,
	}
}

export function createMeetingServicesRefs() {
	const $meetingServicesRefs = createStore<MeetingServiceRef[]>([])
	const $meetingServicesRefsPending = createStore(false)

	const getMeetingServicesRefsFx = attach({ effect: meetingApi.meetingServicesQuery })

	$meetingServicesRefsPending.on(getMeetingServicesRefsFx.pending, (_, pending) => pending)
	$meetingServicesRefs.on(getMeetingServicesRefsFx.doneData, (_, meetingServicesRefs) => meetingServicesRefs)

	return {
		getMeetingServicesRefsFx,
		$meetingServicesRefs,
		$meetingServicesRefsPending,
	}
}
export function createMeetingPlotInspectsRefs() {
	const $meetingPlotInspectsRefs = createStore<MeetingPlotInspectRef[][]>([])
	const $meetingPlotInspectsRefsPending = createStore(false)

	const getMeetingPlotInspectsRefsFx = attach({ effect: meetingApi.meetingPlotInspectsRefsQuery })

	$meetingPlotInspectsRefsPending.on(getMeetingPlotInspectsRefsFx.pending, (_, pending) => pending)
	$meetingPlotInspectsRefs.on(
		getMeetingPlotInspectsRefsFx.doneData,
		(_, meetingPlotInspectsRefs) => meetingPlotInspectsRefs,
	)

	return {
		getMeetingPlotInspectsRefsFx,
		$meetingPlotInspectsRefs,
		$meetingPlotInspectsRefsPending,
	}
}

export function createMeetingContractComplicationsRefs() {
	const $meetingContractComplicationsRefs = createStore<MeetingContractComplicationRef[]>([])
	const $meetingContractComplicationsRefsPending = createStore<boolean>(false)

	const getMeetingContractComplicationsRefsFx = attach({ effect: meetingApi.meetingContractComplicationsRefsQuery })

	$meetingContractComplicationsRefsPending.on(getMeetingContractComplicationsRefsFx.pending, (_, pending) => pending)
	$meetingContractComplicationsRefs.on(
		getMeetingContractComplicationsRefsFx.doneData,
		(_, meetingContractComplicationsRefs) => meetingContractComplicationsRefs,
	)

	return {
		getMeetingContractComplicationsRefsFx,
		$meetingContractComplicationsRefs,
		$meetingContractComplicationsRefsPending,
	}
}

export function createMeetingRecommendsRefs() {
	const $meetingRecommendsRefs = createStore<MeetingRecommendRef[]>([])
	const $meetingRecommendsRefsPending = createStore<boolean>(false)

	const getMeetingRecommendsRefsFx = attach({ effect: meetingApi.meetingRecommendsRefsQuery })

	$meetingRecommendsRefs.on(getMeetingRecommendsRefsFx.doneData, (_, meetingRecommendsRefs) => meetingRecommendsRefs)
	$meetingRecommendsRefsPending.on(getMeetingRecommendsRefsFx.pending, (_, pending) => pending)

	return {
		getMeetingRecommendsRefsFx,
		$meetingRecommendsRefs,
		$meetingRecommendsRefsPending,
	}
}
