import { useStore } from 'effector-react'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import styled from 'styled-components'

import { CreateAreaStructuresAnalyticModal } from '~src/widgets/modal/area-structures-anallytic'
import { CreateCountryAnalyticsModal } from '~src/widgets/modal/country-analytic'
import { CreateMarketPurchaseHistoriesAnalyticModal } from '~src/widgets/modal/market-purchase-histories-analytic'
import { CreatePotentialCulturesAnalyticModal } from '~src/widgets/modal/potential-cultures-anallytic'
import { CreatePurchaseHistoriesAnalyticModal } from '~src/widgets/modal/purchase-histories-analytic'
import { CreateRegionAnalyticModal } from '~src/widgets/modal/region-anallytic'
import { CreateYieldStructuresAnalyticModal } from '~src/widgets/modal/yield-structures-anallytic'

import { CreateClientLand } from '~src/features/client-land/polygon'
import { CreateLand } from '~src/features/land/polygon'

import { CreateElevators } from '~src/entities/elevator'
import { CreateMap } from '~src/entities/map'

import { ContentTemp, Spin } from '~src/shared/ui'

import * as model from './model'
import { MapPlayGroundSidebar } from './sidebar'
import { MapPlayGroundToolbar } from './toolbar'

export const MapPlayGroundPageContent = () => {
	const mapPending = useStore(model.$mapPending)

	useEffect(() => {
		model.mapPlayGroundPageMounted()
	}, [])

	return (
		<ContentTemp.Article>
			<Content>
				<MapContainer model={model.mapModel}>
					<CreateLand.RegionsLandPolygon model={model.landModel} />
					{/*<CreateLand.DistrictsLandPolygon model={model.landModel} />*/}
					<CreateLand.RegionLandPolygon model={model.landModel} />
					<CreateClientLand.ClientsLandPolygon model={model.clientLandModel} />
					<CreateClientLand.ClientLandPolygon model={model.clientLandModel} />
					<CreateClientLand.ClientLandPlotCulturesPolygon model={model.clientLandModel} />
					<CreateClientLand.ClientLandPlots model={model.clientLandModel} />
					<CreateClientLand.ClientLandPlot model={model.clientLandModel} />
					<CreateElevators.ElevatorsMarker model={model.elevatorsModel} />

					<MapContentItem bottom={1} right={1}>
						<CreateMap.BoundsToggle model={model.mapModel} />
						<CreateMap.PreviewBounds model={model.mapModel} />
						<CreateMap.PreviewCenter model={model.mapModel} />
						<CreateMap.PreviewZoom model={model.mapModel} />
					</MapContentItem>
				</MapContainer>
				<MapPlayGroundToolbar />

				<MapContentItem bottom={4.5} right={1}>
					<CreateRegionAnalyticModal.CountryAnalyticsModalButton
						model={model.regionAnalyticsModalModel}
					/>
					<CreateCountryAnalyticsModal.CountryAnalyticsModalButton
						model={model.countryAnalyticsModalModel}
					/>
				</MapContentItem>
				<MapContentItem bottom={7.5} right={1}>
					<CreateYieldStructuresAnalyticModal.YieldStructuresAnalyticsModalButton
						model={model.yieldStructuresAnalyticsModalModel}
					/>
					<CreateMarketPurchaseHistoriesAnalyticModal.MarketPurchaseHistoriesAnalyticsModalButton
						model={model.marketPurchaseHistoriesAnalyticsModalModel}
					/>
				</MapContentItem>
				<MapContentItem bottom={10.5} right={1}>
					<CreatePotentialCulturesAnalyticModal.PotentialCulturesAnalyticsModalButton
						model={model.potentialCulturesAnalyticsModalModel}
					/>
					<CreateAreaStructuresAnalyticModal.AreaStructuresAnalyticsModalButton
						model={model.areaStructuresAnalyticsModalModel}
					/>
					<CreatePurchaseHistoriesAnalyticModal.PurchaseHistoriesAnalyticsModalButton
						model={model.purchaseHistoriesAnalyticsModalModel}
					/>
				</MapContentItem>

				<MapContentItem top={3.5} right={1}>
					<CreateElevators.ElevatorsButton model={model.elevatorsModel} />
				</MapContentItem>

				<MapContentItem top={6} right={1}>
					<CreateClientLand.ClientLandPlotGuidToggle model={model.clientLandModel} />
				</MapContentItem>

				<MapPlayGroundSidebar />
				{mapPending && <MapSpin />}

				<CreateCountryAnalyticsModal.CountryAnalyticModal
					model={model.countryAnalyticsModalModel}
				/>
				<CreateRegionAnalyticModal.RegionAnalyticModal model={model.regionAnalyticsModalModel} />
				<CreateYieldStructuresAnalyticModal.YieldStructuresAnalyticModal
					model={model.yieldStructuresAnalyticsModalModel}
				/>
				<CreateMarketPurchaseHistoriesAnalyticModal.MarketPurchaseHistoriesAnalyticModal
					model={model.marketPurchaseHistoriesAnalyticsModalModel}
				/>
				<CreatePotentialCulturesAnalyticModal.PotentialCulturesAnalyticModal
					model={model.potentialCulturesAnalyticsModalModel}
				/>
				<CreateAreaStructuresAnalyticModal.AreaStructuresAnalyticModal
					model={model.areaStructuresAnalyticsModalModel}
				/>
				<CreatePurchaseHistoriesAnalyticModal.PurchaseHistoriesAnalyticModal
					model={model.purchaseHistoriesAnalyticsModalModel}
				/>
			</Content>
		</ContentTemp.Article>
	)
}

const Content = styled.div`
	display: flex;
	flex: 1 0 auto;
	width: 100%;

	position: relative;

	background-color: rgb(184, 211, 245);
`

const MapContainer = styled(CreateMap.Map)`
	width: 100%;
	height: 100%;
`

const MapSpin = styled(Spin)`
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
	z-index: 10000;

	background-color: rgba(0, 0, 0, 0.3);
`

const MapBoundsToggle = styled(CreateMap.BoundsToggle)`
	height: 100%;
	//position: absolute;
	//bottom: 15px;
	//left: 500px;
	//z-index: 10000;
`

const MapContentItem = styled.div<{
	top?: number
	left?: number
	bottom?: number
	right?: number
}>`
	display: flex;
	gap: 1rem;
	justify-content: start;
	align-items: center;

	position: absolute;
	top: ${(p) => p.top ?? 'unset'}rem;
	left: ${(p) => p.left ?? 'unset'}rem;
	bottom: ${(p) => p.bottom ?? 'unset'}rem;
	right: ${(p) => p.right ?? 'unset'}rem;
	z-index: 10000;
`
