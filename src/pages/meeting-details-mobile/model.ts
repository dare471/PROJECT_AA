import { attach, combine, createEvent, createStore, sample } from 'effector'

import { createSteps } from '~src/features/steps'
import { createTimer } from '~src/features/timer'

import { createMeetingDetails, createMeetingPlotInspectsRefs, createMeetingServicesRefs } from '~src/entities/meeting'
import { createMeetingContractComplicationsRefs, createMeetingRecommendsRefs } from '~src/entities/meeting/model'

import {
	meetingApi,
	type MeetingContractComplicationRef,
	type MeetingPlotInspectRef,
	type MeetingServiceRef,
} from '~src/shared/api'
import { ModalsFactory } from '~src/shared/ui'

const MEETING_TIMER_TIMEOUT = 1000

export const meetingDetailsPageMounted = createEvent<{ meetingId: number }>()
export const meetingDetailsPageUnMounted = createEvent<void>()

export const meetingServiceToggled = createEvent<{ value: boolean; meetingService: MeetingServiceRef }>()
export const meetingPlotInspectToggled = createEvent<{ value: boolean; meetingPlotInspect: MeetingPlotInspectRef }>()
export const meetingContractComplicationToggled = createEvent<{
	value: boolean
	meetingContractComplication: MeetingContractComplicationRef
}>()
export const meetingSurveyEndClicked = createEvent<void>()

export const $meetingId = createStore<number | null>(null)

export const $selectMeetingServices = createStore<MeetingServiceRef[]>([])
export const $selectMeetingPlotInspects = createStore<MeetingPlotInspectRef[]>([])
export const $selectMeetingContractComplications = createStore<MeetingContractComplicationRef[]>([])

export const $$modals = ModalsFactory.createModals({
	defaultModalsState: {
		meetingSurvey: false,
	},
})
export const $$meetingDetails = createMeetingDetails()
export const $$meetingSteps = createSteps({
	defaultSteps: ['services', 'plotInspects', 'contractComplications', 'recommends'],
	defaultStep: 'services',
})

export const $$meetingServicesRefs = createMeetingServicesRefs()
export const $$meetingPlotInspectsRefs = createMeetingPlotInspectsRefs()
export const $$meetingContractComplicationsRefs = createMeetingContractComplicationsRefs()
export const $$meetingRecommendsRefs = createMeetingRecommendsRefs()
export const $$meetingTimer = createTimer({
	timeout: MEETING_TIMER_TIMEOUT,
})

export const $isNextDisable = combine(
	{
		currentStep: $$meetingSteps.$currentStep,
		plotInspects: $$meetingPlotInspectsRefs.$meetingPlotInspectsRefs,
		selectServices: $selectMeetingServices,
		selectPlotInspects: $selectMeetingPlotInspects,
		selectContractComplications: $selectMeetingContractComplications,
	},
	({ currentStep, selectServices, plotInspects, selectPlotInspects, selectContractComplications }) => {
		if (currentStep === 'services' && selectServices.length === 0) {
			return true
		} else if (
			currentStep === 'plotInspects' &&
			!plotInspects
				.map((item) => item[0]?.categoryId)
				.every((item) => {
					const result = selectPlotInspects.findIndex((selectItem) => selectItem.categoryId === item) !== -1
					console.log(result)
					return result
				})
		) {
			return true
		} else if (currentStep === 'contractComplications' && selectContractComplications.length === 0) {
			return true
		}

		return false
	},
)
export const $meetingDetailsPending = $$meetingDetails.$meetingsDetailsPending
export const $meetingSurveyPending = combine(
	$$meetingServicesRefs.$meetingServicesRefsPending,
	$$meetingPlotInspectsRefs.$meetingPlotInspectsRefsPending,
	$$meetingContractComplicationsRefs.$meetingContractComplicationsRefsPending,
	$$meetingRecommendsRefs.$meetingRecommendsRefsPending,
	(...pendings) => pendings.some((item) => !!item),
)

const postMeetingSurveyFx = attach({
	effect: meetingApi.meetingSurveyMutation,
	source: {
		meetingId: $meetingId,
		selectServices: $selectMeetingServices,
		selectPlotInspects: $selectMeetingPlotInspects,
		selectContractComplications: $selectMeetingContractComplications,
	},
	mapParams: (params: void, { meetingId, selectServices, selectPlotInspects, selectContractComplications }) => {
		if (!meetingId || selectServices.length === 0) throw new Error('empty')

		return {
			visitId: meetingId,
			providedServices: selectServices.map((service) => service.id),
			plotInspects: selectPlotInspects.map((plotInspect) => ({
				inspectionTypeId: plotInspect.categoryId,
				id: plotInspect.id,
			})),
			contractComplications: selectContractComplications.map((contractComplication) => contractComplication.id),
			recommends: [],
		}
	},
})

sample({
	clock: meetingDetailsPageMounted,
	fn: ({ meetingId }) => meetingId,
	target: $meetingId,
})

sample({
	clock: $meetingId,
	filter: (meetingId: number | null): meetingId is number => meetingId != null,
	fn: (meetingId) => ({ meetingId }),
	target: $$meetingDetails.getMeetingDetailsFx,
})

sample({
	clock: $$meetingTimer.timerStopped,
	target: $$modals.modalOpenClicked.prepend(() => ({ modalName: 'meetingSurvey' })),
})

sample({
	clock: $$modals.$modalsState,
	filter: (modals) => modals.meetingSurvey,
	target: $$meetingServicesRefs.getMeetingServicesRefsFx,
})

sample({
	clock: $$meetingSteps.$currentStep,
	filter: (currentStep) => currentStep === 'services',
	target: $$meetingServicesRefs.getMeetingServicesRefsFx,
})

$selectMeetingServices.on(meetingServiceToggled, (meetingServices, { value, meetingService }) => {
	if (value) {
		return [...meetingServices, meetingService]
	} else {
		return meetingServices.filter((item) => item.id !== meetingService.id)
	}
})

sample({
	clock: $$meetingSteps.$currentStep,
	filter: (currentStep) => currentStep === 'plotInspects',
	target: $$meetingPlotInspectsRefs.getMeetingPlotInspectsRefsFx,
})

$selectMeetingPlotInspects.on(meetingPlotInspectToggled, (meetingServices, { value, meetingPlotInspect }) => {
	if (value) {
		return [...meetingServices, meetingPlotInspect]
	} else {
		return meetingServices.filter((item) => item.id !== meetingPlotInspect.id)
	}
})

sample({
	clock: $$meetingSteps.$currentStep,
	filter: (currentStep) => currentStep === 'contractComplications',
	target: $$meetingContractComplicationsRefs.getMeetingContractComplicationsRefsFx,
})

$selectMeetingContractComplications.on(
	meetingContractComplicationToggled,
	(meetingServices, { value, meetingContractComplication }) => {
		if (value) {
			return [...meetingServices, meetingContractComplication]
		} else {
			return meetingServices.filter((item) => item.id !== meetingContractComplication.id)
		}
	},
)

sample({
	clock: $$meetingSteps.$currentStep,
	filter: (currentStep) => currentStep === 'recommends',
	target: $$meetingRecommendsRefs.getMeetingRecommendsRefsFx,
})

sample({
	clock: $$modals.$modalsState.map((modals) => modals.meetingSurvey),
	filter: (isMeetingSurveyOpen) => !isMeetingSurveyOpen,
	target: [
		$$meetingTimer.$timer.reinit!,
		$selectMeetingServices.reinit!,
		$selectMeetingPlotInspects.reinit!,
		$selectMeetingContractComplications.reinit!,
	],
})

sample({
	clock: meetingSurveyEndClicked,
	target: [postMeetingSurveyFx],
})

sample({
	clock: postMeetingSurveyFx.done,
	source: $meetingId,
	fn: (meetingId) => ({ meetingId: meetingId! }),
	target: [
		$$modals.modalCloseClicked.prepend(() => ({ modalName: 'meetingSurvey' })),
		$$meetingDetails.getMeetingDetailsFx,
	],
})
