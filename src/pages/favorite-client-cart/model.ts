import { attach, createEvent, createStore, sample, type Store } from 'effector'

import { ClientInformalPointFactory } from '~src/features/client-informal-point'
import { ClientOfficeCreate } from '~src/features/client-office'
import { ClientPlotsFactory } from '~src/features/client-plots'

import { MapFactory } from '~src/entities/map'
import { sessionModel } from '~src/entities/session'

import {
	clientApi,
	type FavoriteClientInfo,
	meetingApi,
	type PlannedMeeting,
	type PlannedMeetingMockup,
} from '~src/shared/api'
import { ModalsFactory, TableFactory } from '~src/shared/ui'

export const MEETING_PLACE_TYPE = {
	clientPlot: 40,
	office: 44,
	informal: 48,
}

export const favoriteClientCartPageMounted = createEvent<void>()
export const favoriteClientCartPageUnmounted = createEvent<void>()

export const editCurrentMeetingPlaceClicked = createEvent<void>()

export const clientPlotSettled = createEvent<void>()
export const clientOfficeSettled = createEvent<void>()
export const clientInformalPointSettled = createEvent<void>()

export const plannedMeetingsCreateClicked = createEvent<void>()

export const plannedMeetingsDateChanged = createEvent<Date>()
export const handlePlannedMeetingsDateChanged = plannedMeetingsDateChanged.prepend(
	(event: any) => new Date(event.target.value),
)
export const plannedMeetingsCreated = createEvent<void>()

export const $favoriteClientsInfo = createStore<FavoriteClientInfo[]>([])
export const $favoriteClientsInfoPending = createStore<boolean>(false)

export const $clientPlotAccess = createStore<boolean>(false)
export const $clientOfficeAccess = createStore<boolean>(true)
export const $clientInformalPointAccess = createStore<boolean>(false)

export const $hasPlannedMeetings = createStore<boolean>(false)

export const $plannedMeetingsDate = createStore<Date>(new Date())

export const $plannedMeetings = createStore<PlannedMeeting[]>([])
export const $plannedMeetingsPending = createStore<boolean>(false)

export const favoriteClientsTableModel = createFavoriteClientsTable({
	data: $favoriteClientsInfo,
})
export const plannedMeetingsTableModel = TableFactory.createTable({
	data: $plannedMeetings,
	tableGenerateCb: () => ({
		rowExtend: {},
	}),
	isExtend: true,
})

export const favoriteClientsPageModalsModel = ModalsFactory.createModals({
	defaultModalsState: {
		plannedMeetingsCreate: false,
		selectClientPlotMeetingPlaceModal: false,
		selectOfficeMeetingPlaceModal: false,
		selectInformalMeetingPlaceModal: false,
	},
})

export const mapModel = MapFactory.createMap()

export const favoriteClientPlotsModel = ClientPlotsFactory.createClientPlots({
	map: mapModel.$map,
})

export const favoriteClientOfficeModel = ClientOfficeCreate.createClientOffice()

export const favoriteClientInformalPointModel = ClientInformalPointFactory.createClientInformalPoint.createModel({})

const getFavoriteClientsInfoFx = attach({
	effect: clientApi.favoriteClientsQuery,
	source: sessionModel.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})
const addClientInformalPointFx = attach({ effect: clientApi.addClientInformalPointMutation })
const addPlannedMeetingsFx = attach({
	effect: meetingApi.addPlannedMeetingsMutation,
	source: sessionModel.$session,
	mapParams: (params: { meetingsDate: string; meetings: PlannedMeetingMockup[] }, session) => {
		const { meetingsDate, meetings } = params
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id, meetingsDate, meetings }
	},
})

const getPlannedMeetingsFx = attach({
	effect: meetingApi.plannedMeetingsQuery,
	source: sessionModel.$session,
	mapParams: (params: void, session) => {
		if (!session) throw new Error('Session is not defined')
		return { userId: session.id }
	},
})

sample({
	clock: favoriteClientCartPageMounted,
	target: [getFavoriteClientsInfoFx, getPlannedMeetingsFx],
})

$favoriteClientsInfoPending.on(getFavoriteClientsInfoFx.pending, (state, pending) => pending)
$favoriteClientsInfo.on(getFavoriteClientsInfoFx.doneData, (state, favoriteClientsInfoFx) => favoriteClientsInfoFx)

$plannedMeetingsPending.on(getPlannedMeetingsFx.pending, (state, pending) => pending)
$plannedMeetings.on(getPlannedMeetingsFx.doneData, (state, plannedMeetings) => plannedMeetings)

const rowMeetingPlaceWillChange = sample({
	clock: favoriteClientsTableModel.rowMeetingPlaceSelected,
	fn: ({ id }) => {
		if (id === MEETING_PLACE_TYPE.clientPlot) {
			return { modalName: 'selectClientPlotMeetingPlaceModal' } as const
		}
		if (id === MEETING_PLACE_TYPE.office) {
			return { modalName: 'selectOfficeMeetingPlaceModal' } as const
		}
		if (id === MEETING_PLACE_TYPE.informal) {
			return { modalName: 'selectInformalMeetingPlaceModal' } as const
		}
		return null
	},
})

sample({
	clock: rowMeetingPlaceWillChange,
	target: [
		favoriteClientPlotsModel.$clientPlotId.reinit!,
		favoriteClientPlotsModel.$clientPlots.reinit!,
		favoriteClientOfficeModel.$clientOffice.reinit!,
		favoriteClientInformalPointModel.$description.reinit!,
		favoriteClientInformalPointModel.$marker.reinit!,
		favoriteClientInformalPointModel.$selectRef.reinit!,
		favoriteClientInformalPointModel.$refs.reinit!,
	],
})

const meetingPlaceModalWillOpen = sample({
	clock: rowMeetingPlaceWillChange,
	source: { currentRow: favoriteClientsTableModel.$currentRow, favoriteClientsInfo: $favoriteClientsInfo },
	filter: (_, modal) => Boolean(modal),
	fn: ({ currentRow, favoriteClientsInfo }, modal) => {
		const { modalName } = modal!
		const currentClient = favoriteClientsInfo[currentRow!]!
		return { modalName, clientId: currentClient.clientId }
	},
})

sample({
	clock: editCurrentMeetingPlaceClicked,
	source: { currentRow: favoriteClientsTableModel.$currentRow, tableState: favoriteClientsTableModel.$tableState },
	fn: ({ currentRow, tableState }) => {
		const currentMeetingPlaceRow = tableState.rowMeetingPlace[currentRow!]
		if (currentMeetingPlaceRow.id === MEETING_PLACE_TYPE.clientPlot) {
			return { modalName: 'selectClientPlotMeetingPlaceModal' } as const
		}
		if (currentMeetingPlaceRow.id === MEETING_PLACE_TYPE.office) {
			return { modalName: 'selectOfficeMeetingPlaceModal' } as const
		}

		return { modalName: 'selectInformalMeetingPlaceModal' } as const
	},
	target: favoriteClientsPageModalsModel.modalOpenClicked,
})

sample({
	clock: meetingPlaceModalWillOpen,
	filter: ({ modalName }) => modalName === 'selectClientPlotMeetingPlaceModal',
	target: [favoriteClientsPageModalsModel.modalOpenClicked, favoriteClientPlotsModel.getClientPlotsFx],
})

sample({
	clock: meetingPlaceModalWillOpen,
	filter: ({ modalName }) => modalName === 'selectOfficeMeetingPlaceModal',
	target: [
		favoriteClientsPageModalsModel.modalOpenClicked,
		favoriteClientOfficeModel.getClientOfficeFx,
		favoriteClientPlotsModel.getClientPlotsFx,
	],
})

sample({
	clock: meetingPlaceModalWillOpen,
	filter: ({ modalName }) => modalName === 'selectInformalMeetingPlaceModal',
	target: [
		favoriteClientsPageModalsModel.modalOpenClicked,
		favoriteClientInformalPointModel.getRefsFx,
		favoriteClientPlotsModel.getClientPlotsFx,
	],
})

sample({
	clock: mapModel.$map,
	filter: (map: L.Map | null): map is L.Map => map !== null,
	fn: (map) => {
		map.addEventListener('click', (e) => {
			const { lat, lng } = e.latlng
			favoriteClientInformalPointModel.markerSettled([lat, lng])
		})
	},
})

sample({
	clock: clientPlotSettled,
	source: {
		currentRow: favoriteClientsTableModel.$currentRow,
		tableState: favoriteClientsTableModel.$tableState,
		clientPlotId: favoriteClientPlotsModel.$clientPlotId,
	},
	fn: ({ currentRow, tableState, clientPlotId }) => {
		if (!clientPlotId) return tableState
		return {
			...tableState,
			rowClientPlot: {
				...tableState.rowClientPlot,
				[currentRow!]: clientPlotId,
			},
		}
	},
	target: [
		favoriteClientsTableModel.$tableState,
		favoriteClientsPageModalsModel.modalCloseClicked.prepend(() => ({
			modalName: 'selectClientPlotMeetingPlaceModal',
		})),
	],
})

sample({
	clock: clientOfficeSettled,
	source: {
		currentRow: favoriteClientsTableModel.$currentRow,
		tableState: favoriteClientsTableModel.$tableState,
		clientOffice: favoriteClientOfficeModel.$clientOffice,
	},
	fn: ({ currentRow, tableState, clientOffice }) => {
		if (!clientOffice) return tableState
		return {
			...tableState,
			rowClientOfficePoint: {
				...tableState.rowClientOfficePoint,
				[currentRow!]: clientOffice ? [clientOffice.officeCoordinate.lat, clientOffice.officeCoordinate.lng] : null,
			},
			rowClientOfficeDuration: {
				...tableState.rowClientOfficeDuration,
				[currentRow!]: clientOffice ? clientOffice.directionMatrix.rows[0]?.elements[0]?.duration?.value : null,
			},
			rowClientOfficeDistance: {
				...tableState.rowClientOfficeDistance,
				[currentRow!]: clientOffice ? clientOffice.directionMatrix.rows[0]?.elements[0]?.distance?.value : null,
			},
		}
	},
	target: [
		favoriteClientsTableModel.$tableState,
		favoriteClientsPageModalsModel.modalCloseClicked.prepend(() => ({ modalName: 'selectOfficeMeetingPlaceModal' })),
	],
})

sample({
	clock: clientInformalPointSettled,
	source: {
		currentRow: favoriteClientsTableModel.$currentRow,
		tableState: favoriteClientsTableModel.$tableState,
		clientInformalPointMarker: favoriteClientInformalPointModel.$marker,
		clientInformalPointRef: favoriteClientInformalPointModel.$selectRef,
		clientInformalPointDescription: favoriteClientInformalPointModel.$description,
	},
	fn: ({
		currentRow,
		tableState,
		clientInformalPointMarker,
		clientInformalPointRef,
		clientInformalPointDescription,
	}) => {
		return {
			...tableState,
			rowClientInformalPointMarker: {
				...tableState.rowClientInformalPointMarker,
				[currentRow!]: clientInformalPointMarker,
			},
			rowClientInformalPointDescription: {
				...tableState.rowClientInformalPointDescription,
				[currentRow!]: clientInformalPointDescription,
			},
			rowClientInformalPointRef: {
				...tableState.rowClientInformalPointRef,
				[currentRow!]: clientInformalPointRef,
			},
		}
	},
	target: [
		favoriteClientsTableModel.$tableState,
		favoriteClientsPageModalsModel.modalCloseClicked.prepend(() => ({ modalName: 'selectInformalMeetingPlaceModal' })),
	],
})

sample({
	clock: clientInformalPointSettled,
	source: {
		favoriteClientsInfo: $favoriteClientsInfo,
		currentRow: favoriteClientsTableModel.$currentRow,
		clientInformalPointMarker: favoriteClientInformalPointModel.$marker,
		clientInformalPointRef: favoriteClientInformalPointModel.$selectRef,
		clientInformalPointDescription: favoriteClientInformalPointModel.$description,
	},
	fn: ({
		currentRow,
		favoriteClientsInfo,
		clientInformalPointMarker,
		clientInformalPointRef,
		clientInformalPointDescription,
	}) => {
		return {
			clientId: favoriteClientsInfo![currentRow!]!.clientId,
			point: clientInformalPointMarker!,
			ref: clientInformalPointRef!,
			details: clientInformalPointDescription!,
		}
	},
	target: addClientInformalPointFx,
})

sample({
	source: favoriteClientPlotsModel.$clientPlotId,
	fn: (clientPlotId) => clientPlotId !== null,
	target: $clientPlotAccess,
})

sample({
	source: {
		marker: favoriteClientInformalPointModel.$marker,
		description: favoriteClientInformalPointModel.$description,
		ref: favoriteClientInformalPointModel.$selectRef,
	},
	fn: ({ marker, description, ref }) => marker !== null && description !== '' && ref !== null,
	target: $clientInformalPointAccess,
})

$hasPlannedMeetings.on(favoriteClientsTableModel.$tableState, (state, tableState) => {
	let isAccess = false
	for (const rowIndex of Object.keys(tableState.rowSelect)) {
		if (
			(tableState.rowSelect[rowIndex] &&
				tableState.rowMeetingType[rowIndex] &&
				tableState.rowMeetingPlace[rowIndex] &&
				tableState.rowMeetingPlace[rowIndex]?.id === MEETING_PLACE_TYPE.clientPlot &&
				tableState.rowClientPlot[rowIndex]) ||
			(tableState.rowMeetingPlace[rowIndex]?.id === MEETING_PLACE_TYPE.office &&
				tableState.rowClientOfficePoint[rowIndex] &&
				tableState.rowClientOfficeDuration[rowIndex] &&
				tableState.rowClientOfficeDistance[rowIndex]) ||
			(tableState.rowMeetingPlace[rowIndex]?.id === MEETING_PLACE_TYPE.informal &&
				tableState.rowClientInformalPointMarker[rowIndex] &&
				tableState.rowClientInformalPointRef[rowIndex] &&
				tableState.rowClientInformalPointDescription[rowIndex])
		) {
			isAccess = true
			break
		}
	}
	return isAccess
})

sample({
	clock: plannedMeetingsCreateClicked,
	fn: () => ({ modalName: 'plannedMeetingsCreate' } as const),
	target: favoriteClientsPageModalsModel.modalOpenClicked,
})

$plannedMeetingsDate.on(plannedMeetingsDateChanged, (state, date) => date)

sample({
	clock: plannedMeetingsCreated,
	source: {
		tableState: favoriteClientsTableModel.$tableState,
		plannedMeetingsDate: $plannedMeetingsDate,
		favoriteClientsInfo: $favoriteClientsInfo,
	},
	fn: ({ tableState, favoriteClientsInfo, plannedMeetingsDate }) => {
		const plannedMeetings: PlannedMeetingMockup[] = []

		for (const rowIndex of Object.keys(tableState.rowSelect)) {
			if (
				!tableState.rowSelect[rowIndex] &&
				!tableState.rowMeetingType[rowIndex] &&
				!tableState.rowMeetingPlace[rowIndex] &&
				!tableState.rowClientPlot[rowIndex] &&
				!tableState.rowClientOfficePoint[rowIndex] &&
				!tableState.rowClientOfficeDuration[rowIndex] &&
				!tableState.rowClientOfficeDistance[rowIndex] &&
				!tableState.rowClientInformalPointMarker[rowIndex] &&
				!tableState.rowClientInformalPointRef[rowIndex] &&
				!tableState.rowClientInformalPointDescription[rowIndex] &&
				!tableState.rowClientInformalPointMarker[rowIndex] &&
				!tableState.rowClientInformalPointRef[rowIndex]
			) {
				continue
			}
			const rowMeetingPlaceId = tableState.rowMeetingPlace[rowIndex!].id

			if (rowMeetingPlaceId === MEETING_PLACE_TYPE.clientPlot) {
				plannedMeetings.push({
					clientId: favoriteClientsInfo![rowIndex]!.clientId,
					meetingType: tableState.rowMeetingType[rowIndex].id,
					meetingPlace: tableState.rowMeetingPlace[rowIndex].id,
					plotId: tableState.rowClientPlot[rowIndex]!,
					point: null,
					officeDistance: null,
					officeDuration: null,
				})
			}
			if (rowMeetingPlaceId === MEETING_PLACE_TYPE.office) {
				plannedMeetings.push({
					clientId: favoriteClientsInfo![rowIndex]!.clientId,
					meetingType: tableState.rowMeetingType[rowIndex].id,
					meetingPlace: tableState.rowMeetingPlace[rowIndex].id,
					plotId: null,
					point: tableState.rowClientOfficePoint[rowIndex]!,
					officeDistance: tableState.rowClientOfficeDistance[rowIndex]!,
					officeDuration: tableState.rowClientOfficeDuration[rowIndex]!,
				})
			}
			if (rowMeetingPlaceId === MEETING_PLACE_TYPE.informal) {
				plannedMeetings.push({
					clientId: favoriteClientsInfo![rowIndex]!.clientId,
					meetingType: tableState.rowMeetingType[rowIndex].id,
					meetingPlace: tableState.rowMeetingPlace[rowIndex].id,
					plotId: null,
					point: tableState.rowClientInformalPointMarker[rowIndex]!,
					officeDistance: null,
					officeDuration: null,
				})
			}
		}

		return { meetingsDate: getValueFromDate(plannedMeetingsDate)!, meetings: plannedMeetings }
	},
	target: addPlannedMeetingsFx,
})

sample({
	clock: addPlannedMeetingsFx.done,
	fn: () => ({ modalName: 'plannedMeetingsCreate' } as const),
	target: [
		favoriteClientsPageModalsModel.modalCloseClicked,
		favoriteClientsTableModel.tableReset,
		getPlannedMeetingsFx,
	],
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface FavoriteClientsTableState {
	rowSelect: Record<number, boolean>
	rowExtend: Record<number, boolean>
	rowMeetingType: Record<number, { id: number; name: string }>
	rowMeetingPlace: Record<number, { id: number; name: string }>
	rowClientPlot: Record<number, number | null>
	rowClientOfficePoint: Record<number, [number, number] | null>
	rowClientOfficeDuration: Record<number, number | null>
	rowClientOfficeDistance: Record<number, number | null>
	rowClientInformalPointMarker: Record<number, [number, number] | null>
	rowClientInformalPointRef: Record<number, string | null>
	rowClientInformalPointDescription: Record<number, string | null>
}

interface CreateFavoriteClientsTableOptions {
	data: Store<FavoriteClientInfo[]>
}

function createFavoriteClientsTable(options: CreateFavoriteClientsTableOptions) {
	const { data } = options

	const tableModel = TableFactory.createTable({
		data,
		tableGenerateCb: (favoriteClientsInfo) => ({
			rowSelect: favoriteClientsInfo.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}),
			rowExtend: favoriteClientsInfo.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}),
			rowMeetingPlace: {},
			rowMeetingType: {},
			rowClientPlot: {},
			rowClientOfficePoint: {},
			rowClientOfficeDuration: {},
			rowClientOfficeDistance: {},
			rowClientInformalPointMarker: {},
			rowClientInformalPointRef: {},
			rowClientInformalPointDescription: {},
		}),
		tableState: createStore<FavoriteClientsTableState>({
			rowSelect: {},
			rowExtend: {},
			rowMeetingType: {},
			rowMeetingPlace: {},
			rowClientPlot: {},
			rowClientOfficePoint: {},
			rowClientOfficeDuration: {},
			rowClientOfficeDistance: {},
			rowClientInformalPointMarker: {},
			rowClientInformalPointRef: {},
			rowClientInformalPointDescription: {},
		}),
		isSelect: true,
	})

	const rowMeetingTypeSelected = tableModel.createRowEvent<{
		rowIndex: number
		id: number | null
		name: string | null
	}>()
	const rowMeetingPlaceSelected = tableModel.createRowEvent<{
		rowIndex: number
		id: number | null
		name: string | null
	}>()

	tableModel.$tableState.on(rowMeetingTypeSelected, (state, { rowIndex, id, name }) => ({
		...state,
		rowMeetingType: {
			...state.rowMeetingType,
			[rowIndex]: { id, name },
		},
	}))

	tableModel.$tableState.on(rowMeetingPlaceSelected, (state, { rowIndex, id, name }) => ({
		...state,
		rowMeetingPlace: {
			...state.rowMeetingPlace,
			[rowIndex]: { id, name },
		},
	}))

	return { ...tableModel, rowMeetingTypeSelected, rowMeetingPlaceSelected }
}

export function getValueFromDate(date: Date) {
	return date.toISOString().split('T')[0]
}
