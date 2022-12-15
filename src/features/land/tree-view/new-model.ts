import { createEvent, createStore, type Event, sample, type Store } from 'effector'
import { modelFactory } from 'effector-factorio'

import type { District, Region } from '~src/shared/api'

export interface Branch {
	type: 'region' | 'district'
	name: string
	id: number
	active: boolean
	loading: boolean
	childBranch?: Branch[]
}

interface LandTreeViewFactoryOptions {
	$regions: Store<Region[] | null>
	$regionId: Store<number | null>
	$districts: Store<District[] | null>
	$districtId: Store<number | null>
	regionIdSet: Event<number>
	districtIdSet: Event<number>
}

export const landTreeViewFactory = modelFactory(function landTreeViewFactory(
	options: LandTreeViewFactoryOptions
) {
	const branchClicked = createEvent<Branch>()

	const $treeView = createStore<Branch[] | null>(null)
	const $currentBranches = createStore<Branch[]>([])

	sample({
		clock: options.$regions,
		filter: (regions: Region[] | null): regions is Region[] => Boolean(regions),
		fn: (regions) => regions.map((region) => generateBranch(region)),
		target: $treeView
	})

	const districtsWillChange = sample({
		clock: [options.$regionId, options.$districts],
		source: {
			regions: options.$regions,
			regionId: options.$regionId,
			districts: options.$districts
		}
	})

	const districtsWillLoad = sample({
		clock: districtsWillChange,
		filter: (source: {
			regions: Region[] | null
			regionId: number | null
			districts: District[] | null
		}): source is { regions: Region[]; regionId: number; districts: District[] } =>
			Boolean(source.regions) && Boolean(source.regionId) && !Boolean(source.districts)
	})

	sample({
		clock: districtsWillLoad,
		fn: ({ regions, regionId }) => {
			const regionsData = regions
			const treeView = regionsData.map((region) =>
				region.regionId !== regionId
					? generateBranch(region)
					: generateBranch(region, {
							active: true,
							loading: true
					  })
			)

			return treeView
		},
		target: $treeView
	})

	const districtsWillFinish = sample({
		clock: districtsWillChange,
		filter: (source: {
			regions: Region[] | null
			regionId: number | null
			districts: District[] | null
		}): source is { regions: Region[]; regionId: number; districts: District[] } =>
			Boolean(source.regions) && Boolean(source.regionId) && Boolean(source.districts)
	})

	sample({
		clock: districtsWillFinish,
		fn: ({ regions, regionId, districts }) => {
			const regionsData = regions
			const childBranch = districts.map((district) => generateBranch(district))
			const treeView = regionsData.map((region) =>
				region.regionId !== regionId
					? generateBranch(region)
					: generateBranch(region, { active: true, childBranch })
			)

			return treeView
		},
		target: $treeView
	})

	sample({
		clock: branchClicked,
		filter: ({ type, id }) => type === 'region' && Boolean(id),
		fn: ({ id }) => id,
		target: options.regionIdSet
	})

	sample({
		clock: branchClicked,
		filter: ({ type, id }) => type === 'district' && Boolean(id),
		fn: ({ id }) => id,
		target: options.districtIdSet
	})

	return {
		$treeView,
		branchClicked,
		$currentBranches
	}
})

function generateBranch(
	land: Region | District,
	options?: { active?: boolean; loading?: boolean; childBranch?: Branch[] }
): Branch {
	return {
		type: land.type,
		name: land.name,
		id: 'regionId' in land ? land.regionId : land.districtId,
		active: options?.active ?? false,
		loading: options?.loading ?? false,
		childBranch: options?.childBranch ?? undefined
	}
}
