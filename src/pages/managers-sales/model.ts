import { attach, createEvent, createStore, sample } from 'effector'

import { managerApi, type ManagersFromTo, type ManagersFromToManager, type ManagersSalesResult } from '~src/shared/api'
import { createModals } from '~src/shared/ui/modal/model'

export const managersPageMounted = createEvent<void>()
export const managersPageUnMounted = createEvent<void>()

export const airplaneClusterClicked = createEvent<boolean>()

export const $managersFromToPending = createStore<boolean>(false)
export const $managersFromTo = createStore<Array<ManagersFromTo>>([])
export const $currentManagerFromTo = $managersFromTo.map((managersFromTo) => {
	if (!managersFromTo) return null

	const currentCountry = managersFromTo.find((country) => country.progress !== null && country.progress < 100)
	if (!currentCountry) return null

	return {
		...currentCountry,

		managers: currentCountry.managers.map((manager) => ({
			...manager,
			color: randomDarkHsl(),
		})),
	}
})

export const $isAirplaneCluster = createStore<boolean>(true)

export const $managersSalesResultPending = createStore<boolean>(false)
export const $managersSalesResult = createStore<ManagersSalesResult | null>(null)

export const $allManagersPending = createStore<boolean>(false)
export const $allManagers = createStore<Array<ManagersFromToManager>>([])

export const $$modals = createModals({
	defaultModalsState: {
		allUsers: false,
	},
})

const getManagersFromToFx = attach({
	effect: managerApi.managersFromToManagerQuery,
})
const getManagersSalesResultFx = attach({
	effect: managerApi.managersSalesResultQuery,
})
const getAllManagersFx = attach({
	effect: managerApi.allManagersQuery,
})

sample({
	clock: managersPageMounted,
	target: [getManagersFromToFx, getManagersSalesResultFx],
})

$currentManagerFromTo.watch(console.log)

$managersFromToPending.on(getManagersFromToFx.pending, (_, pending) => pending)
$managersFromTo.on(getManagersFromToFx.doneData, (_, managersFromTo) => managersFromTo)

$managersSalesResultPending.on(getManagersSalesResultFx.pending, (_, pending) => pending)
$managersSalesResult.on(getManagersSalesResultFx.doneData, (_, result) => result)

$allManagersPending.on(getAllManagersFx.pending, (_, pending) => pending)
$allManagers.on(getAllManagersFx.doneData, (_, managers) => managers)

$isAirplaneCluster.on(airplaneClusterClicked, (_, newIsCluster) => newIsCluster)

sample({
	clock: $$modals.$modalsState,
	filter: (modals) => modals.allUsers,
	target: getAllManagersFx,
})

sample({
	clock: managersPageUnMounted,
	target: [$managersFromTo.reinit!, $managersSalesResult.reinit!, $allManagers.reinit!],
})

export function randomDarkHsl() {
	const hue = Math.floor(Math.random() * 360)
	const saturation = Math.floor(Math.random() * 100)
	const lightness = Math.floor(Math.random() * 50) + 25

	return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
