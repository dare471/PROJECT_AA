import { combine, createEvent, createStore, sample } from 'effector'
import type { LatLngTuple, Map } from 'leaflet'
import { Polygon } from 'leaflet'

import { CreateAreaStructuresAnalyticModal } from '~src/widgets/modal/area-structures-anallytic'
import { CreateCountryAnalyticsModal } from '~src/widgets/modal/country-analytic'
import { CreateMarketPurchaseHistoriesAnalyticModal } from '~src/widgets/modal/market-purchase-histories-analytic'
import { CreatePotentialCulturesAnalyticModal } from '~src/widgets/modal/potential-cultures-anallytic'
import { CreatePurchaseHistoriesAnalyticModal } from '~src/widgets/modal/purchase-histories-analytic'
import { CreateRegionAnalyticModal } from '~src/widgets/modal/region-anallytic'
import { CreateYieldStructuresAnalyticModal } from '~src/widgets/modal/yield-structures-anallytic'

import { CreateClientLand } from '~src/features/client-land/polygon'
import { CreateLand } from '~src/features/land/polygon'
import { CreateLandTreeView } from '~src/features/land/tree-view'

import { CreateElevators } from '~src/entities/elevator'
import { CreateMap } from '~src/entities/map'

import type { ClientLand, Region } from '~src/shared/api'
import { CreateSelect } from '~src/shared/ui'
import { Option } from '~src/shared/ui/atoms/select/model'

type LandTypes = 'region' | 'district' | 'clientLand' | 'clientLandCulture' | 'clientLandPlot'

type Depict = Record<LandTypes, boolean>

const TILE_LAYER = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
export const CENTER = [48.356, 66.687] as LatLngTuple
export const ZOOM = 5

export const mapModel = CreateMap.mapFactory.createModel({
	tileLayer: TILE_LAYER,
	center: CENTER,
	zoom: ZOOM,
	scrollWheelZoom: false,
	observeMove: true,
	observeZoom: true
})

export const landModel = CreateLand.landFactory.createModel({
	$viewRegions: createStore(true),
	$viewDistrict: createStore(false)
})

export const clientLandModel = CreateClientLand.clientLandFactory.createModel({
	$viewClientLand: createStore(true)
})

export const landTreeViewModel = CreateLandTreeView.landTreeViewFactory.createModel({
	$regions: landModel.$regions,
	$regionId: landModel.$regionId,
	$districts: landModel.$districts,
	$districtId: landModel.$districtId,
	districtIdSet: landModel.districtIdSet,
	regionIdSet: landModel.regionIdSet
})

export const regionCulturesSelectModel = CreateSelect.selectFactory.createModel({
	$options: landModel.$regionCultures.map((cultures) =>
		cultures
			? cultures.map((culture) => ({
					label: culture.cultureName,
					value: culture.cultureId
			  }))
			: []
	)
})

export const regionsSelectModel = CreateSelect.selectFactory.createModel({
	$options: landModel.$regions.map((regions) =>
		regions
			? (regions.map((region) => ({
					label: region.name,
					value: region.regionId
			  })) as any)
			: []
	)
})

export const countryAnalyticsModalModel =
	CreateCountryAnalyticsModal.countryAnalyticModalFactory.createModel({})

export const regionAnalyticsModalModel =
	CreateRegionAnalyticModal.regionAnalyticModalFactory.createModel({
		$regionId: landModel.$regionId
	})

export const yieldStructuresAnalyticsModalModel =
	CreateYieldStructuresAnalyticModal.yieldStructuresAnalyticModalFactory.createModel({
		$clientLandId: clientLandModel.$clientLandId
	})
export const marketPurchaseHistoriesAnalyticsModalModel =
	CreateMarketPurchaseHistoriesAnalyticModal.marketPurchaseHistoriesAnalyticModalFactory.createModel(
		{ $clientLandId: clientLandModel.$clientLandId }
	)
export const potentialCulturesAnalyticsModalModel =
	CreatePotentialCulturesAnalyticModal.potentialCulturesAnalyticModalFactory.createModel({
		$clientLandId: clientLandModel.$clientLandId
	})
export const areaStructuresAnalyticsModalModel =
	CreateAreaStructuresAnalyticModal.areaStructuresAnalyticModalFactory.createModel({
		$clientLandId: clientLandModel.$clientLandId
	})
export const purchaseHistoriesAnalyticsModalModel =
	CreatePurchaseHistoriesAnalyticModal.purchaseHistoriesAnalyticModalFactory.createModel({
		$clientLandId: clientLandModel.$clientLandId
	})

export const elevatorsModel = CreateElevators.elevatorsFactory.createModel({})

export const mapPlayGroundPageMounted = createEvent<void>()
export const sidebarButtonClicked = createEvent<void>()

const $depict = createStore<Depict>({
	region: false,
	district: false,
	clientLand: false,
	clientLandCulture: false,
	clientLandPlot: false
})
export const $sidebarOpen = createStore<boolean>(false)

export const $mapPending = combine(
	landModel.getRegionsFx.pending,
	landModel.getDistrictsFx.pending,
	clientLandModel.getClientsLandFromRegionFx.pending,
	clientLandModel.getClientsLandPlotsCulturesFx.pending,
	clientLandModel.getClientLandPlotsFx.pending,
	elevatorsModel.getElevatorsFx.pending,
	(
		regionsPending,
		districtsPending,
		clientsLandsPending,
		clientsLandPlotsCulturesPending,
		clientLandPlotsPending,
		elevatorsPending
	) =>
		regionsPending ||
		districtsPending ||
		clientsLandsPending ||
		clientsLandPlotsCulturesPending ||
		clientLandPlotsPending ||
		elevatorsPending
)

sample({
	clock: mapPlayGroundPageMounted,
	target: landModel.getRegions
})

$sidebarOpen.on(sidebarButtonClicked, (prev) => !prev)

sample({
	clock: mapModel.$map,
	target: mapModel.currentBoundsSet
})

$depict.on(landModel.regionClicked, (prevDepict) => ({
	...prevDepict,
	region: !prevDepict.region
}))
$depict.on(landModel.districtClicked, (prevDepict) => ({
	...prevDepict,
	district: !prevDepict.district
}))
$depict.on(clientLandModel.clientLandClicked, (prevDepict) => ({
	...prevDepict,
	clientLand: !prevDepict.clientLand
}))
$depict.on(clientLandModel.clientLandPlotClicked, (prevDepict) => ({
	...prevDepict,
	clientLandPlot: !prevDepict.clientLandPlot
}))

sample({
	clock: landModel.$regionId,
	filter: (regionId: number | null): regionId is number => Boolean(regionId),
	fn: (regionId) => ({ id: regionId }),
	target: clientLandModel.getClientsLand
})

sample({
	clock: landModel.$region,
	source: { map: mapModel.$map, region: landModel.$region },
	filter: (source: {
		map: Map | null
		region: Region | null
	}): source is { map: Map; region: Region } => Boolean(source.map) && Boolean(source.region),
	fn: ({ map, region }) => {
		//FIXME: rewrite to effect if it need's
		const polygon = new Polygon(region.geometry_rings as any)
		polygon.addTo(map)
		const { lat, lng } = polygon.getCenter()
		polygon.remove()
		const zoom = 7
		return { lat, lng, zoom }
	},
	target: mapModel.viewSet
})

sample({
	clock: clientLandModel.$clientLandId,
	source: { map: mapModel.$map, clientLand: clientLandModel.$clientLand },
	filter: (source: {
		map: Map | null
		clientLand: ClientLand | null
	}): source is { map: Map; clientLand: ClientLand } =>
		Boolean(source.map) && Boolean(source.clientLand),
	fn: ({ map, clientLand }) => {
		//FIXME: rewrite to effect if it need's
		const polygon = new Polygon([
			[
				clientLand.linkPlot[0].geometry_rings[0][1][1],
				clientLand.linkPlot[0].geometry_rings[0][0][0]
			]
		] as any)
		polygon.addTo(map)
		const { lat, lng } = polygon.getCenter()
		polygon.remove()
		const zoom = 10
		return { lat, lng, zoom }
	},
	target: mapModel.viewSet
})

sample({
	clock: regionCulturesSelectModel.$currentOptions,
	source: { regionId: landModel.$regionId, cultOptions: regionCulturesSelectModel.$currentOptions },
	filter: (source: {
		regionId: number | null
		cultOptions: Option[]
	}): source is { regionId: number; cultOptions: Option[] } =>
		Boolean(source.regionId) && source.cultOptions.length !== 0,
	fn: ({ regionId, cultOptions }) => ({
		regionId,
		cultIds: cultOptions.map((cultOption) => Number(cultOption.value))
	}),
	target: clientLandModel.getClientsLandPlotsCultures
})

sample({
	clock: regionCulturesSelectModel.$currentOptions,
	filter: (cultOptions) => cultOptions.length === 0,
	target: clientLandModel.resetClientsLandPlotsCultures
})

sample({
	clock: landModel.$regionId,
	target: clientLandModel.resetClientsLandPlotsCultures
})

sample({
	clock: landModel.$region,
	filter: (region: Region | null): region is Region => Boolean(region),
	fn: (region) => ({ label: region.name, value: region.regionId } as any),
	target: regionsSelectModel.optionSet
})

sample({
	clock: regionsSelectModel.$currentOption,
	filter: (option: Option | null): option is Option => Boolean(option),
	fn: (option) => Number(option.value),
	target: landModel.regionIdSet
})

sample({
	clock: landModel.$regionId,
	target: [clientLandModel.$clientLandId.reinit!, clientLandModel.$clientLandPlots.reinit!]
})
