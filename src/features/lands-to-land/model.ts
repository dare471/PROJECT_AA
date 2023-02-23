import { combine, createEvent, createStore, type Store } from 'effector'

export interface Land {
	id: number
	geometryRings: number[][][]
}

interface CreateLandsToLandOptions<T extends Land> {
	lands: Store<T[]>
	landCb?: (args: { lands: T[]; landId: number | null }) => T | null
}

export function createLandsToLand<T extends Land>(options: CreateLandsToLandOptions<T>) {
	const { lands: $lands, landCb } = options

	const landClicked = createEvent<number>()

	const $landId = createStore<number | null>(null)
	const $land = combine($lands, $landId, (lands, landId) =>
		landCb ? landCb({ lands, landId }) : getFindLand({ lands, landId }),
	)

	$landId.on(landClicked, (_, landId) => landId)

	return { _$lands: $lands, $landId, $land, landClicked }
}

function getFindLand<T extends Land>({ lands, landId }: { lands: T[]; landId: number | null }) {
	return lands.find((land) => land.id === landId) ?? null
}
