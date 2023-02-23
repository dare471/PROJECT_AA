import { createEvent, createStore, type Event, sample, type Store } from 'effector'

import { type District, type Region } from '~src/shared/api'

export interface Node {
	type: 'region' | 'district'
	id: number
	name: string
	active: boolean
	loading: boolean
	childNodes: Node[] | undefined
}

interface CreateTreeViewOptions {
	regions: Store<Region[]>
	districts: Store<District[]>
	regionId: Store<number | null>
	districtId: Store<number | null>
	regionIdSet: Event<number>
	districtIdSet: Event<number>
}

export function createRegionsTreeView(options: CreateTreeViewOptions) {
	const { regions: $regions, districts: $districts, regionId: $regionId, districtId: $districtId } = options

	const nodeClicked = createEvent<Node>()

	const $treeView = createStore<Node[]>([])

	sample({
		clock: $regions,
		filter: (regions) => regions.length !== 0,
		fn: (regions) => regions.map((region) => generateNode(region)),
		target: $treeView,
	})

	const districtsWillChange = sample({
		clock: [$regionId, $districts],
		source: {
			regions: $regions,
			regionId: $regionId,
			districts: $districts,
		},
	})

	const districtsWillLoad = sample({
		clock: districtsWillChange,
		filter: (source: {
			regions: Region[]
			regionId: number | null
			districts: District[]
		}): source is { regions: Region[]; regionId: number; districts: District[] } =>
			source.regions.length !== 0 && source.regionId !== null && source.districts.length === 0,
	})

	sample({
		clock: districtsWillLoad,
		fn: ({ regions, regionId }) => {
			const regionsData = regions
			const treeView = regionsData.map((region) =>
				region.id !== regionId
					? generateNode(region)
					: generateNode(region, {
							active: true,
							loading: true,
					  }),
			)

			return treeView
		},
		target: $treeView,
	})

	const districtsWillFinish = sample({
		clock: districtsWillChange,
		filter: (source: {
			regions: Region[]
			regionId: number | null
			districts: District[]
		}): source is { regions: Region[]; regionId: number; districts: District[] } =>
			source.regions.length !== 0 && source.regionId !== null && source.districts.length !== 0,
	})

	sample({
		clock: districtsWillFinish,
		fn: ({ regions, regionId, districts }) => {
			const regionsData = regions
			const childNodes = districts.map((district) => generateNode(district))
			const treeView = regionsData.map((region) =>
				region.id !== regionId ? generateNode(region) : generateNode(region, { active: true, childNodes }),
			)

			return treeView
		},
		target: $treeView,
	})

	sample({
		clock: nodeClicked,
		filter: ({ type, id }) => type === 'region' && id !== null,
		fn: ({ id }) => id,
		target: options.regionIdSet,
	})

	sample({
		clock: nodeClicked,
		filter: ({ type, id }) => type === 'district' && id !== null,
		fn: ({ id }) => id,
		target: options.districtIdSet,
	})

	return {
		$treeView,
		nodeClicked,
	}
}

function generateNode(
	node: Region | District,
	options?: { active?: boolean; loading?: boolean; childNodes?: Node[] },
): Node {
	return {
		type: node.type,
		name: node.name,
		id: node.id,
		active: options?.active ?? false,
		loading: options?.loading ?? false,
		childNodes: options?.childNodes ?? undefined,
	}
}
