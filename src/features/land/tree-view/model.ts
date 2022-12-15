import { createEvent, createStore, sample } from 'effector'

import { landModel } from '~src/entities/land'

import type { District, Region } from '~src/shared/api'

export interface Branch {
	type: 'region' | 'district'
	name: string
	id: number
	active: boolean
	loading: boolean
	childBranch?: Branch[]
}

export const branchClicked = createEvent<Branch>()

export const $treeView = createStore<Branch[] | null>(null)
const $currentBranches = createStore<Branch[]>([])

sample({
	clock: landModel.$regions,
	filter: (regions: Region[] | null): regions is Region[] => Boolean(regions),
	fn: (regions) => regions.map((region) => generateBranch(region)),
	target: $treeView
})

const districtsWillChange = sample({
	clock: [landModel.$regionId, landModel.$districts],
	source: {
		regions: landModel.$regions,
		regionId: landModel.$regionId,
		districts: landModel.$districts
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
	target: landModel.regionIdSet
})

sample({
	clock: branchClicked,
	filter: ({ type, id }) => type === 'district' && Boolean(id),
	fn: ({ id }) => id,
	target: landModel.districtIdSet
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
