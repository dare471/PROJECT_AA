import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { memo, useCallback } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { NumberParam, useQueryParam } from 'use-query-params'

import { TMode } from '@/3.pages/map'

import { MapMarkers } from '@/6.entities/marker'
import { MapPolygons } from '@/6.entities/polygon'

import { TClientPolygon, TDistrictPolygon, TPolygon, TPolygonType } from '@/7.shared/api'
import { ElevatorIcon } from '@/7.shared/assets'
import { TSetState } from '@/7.shared/lib/react'

import { getChoosePolygon } from '../lib'
import { MapPosition, TPosition } from './position'
import './styles.scss'

type TMapProps = {
	position: TPosition
	handleMutation: any
	illustrate?: TPolygonType
	setIllustrate: TSetState<TPolygonType | undefined>
}

export const Map = memo((props: TMapProps) => {
	const { handleMutation, position, illustrate, setIllustrate } = props

	const [countryMutation] = handleMutation('country')
	const [regionMutation] = handleMutation('region')
	const [districtMutation] = handleMutation('district')
	const [clientPolygonsMutation] = handleMutation('clientPolygons')
	const [clientPolygonMutation] = handleMutation('clientPolygon')
	const [elevatorMarkersMutation] = handleMutation('elevatorMarkers')
	const [districtQP, setDistrictQP] = useQueryParam('district', NumberParam)
	const [clientPolygonsQP, setClientPolygonsQP] = useQueryParam('clientPolygons', NumberParam)
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon', NumberParam)
	const [modeQP] = useQueryParam<TMode>('mode')

	const LeafIcon = icon({
		iconUrl: ElevatorIcon,
		iconSize: [35, 35]
	})

	const handleClickCurrent = useCallback(
		(polygon: TPolygon | TClientPolygon, illustrateDataQP: any, setIllustrateDataQP: any) => {
			const type = polygon.type as TPolygonType
			let id = polygon.cato

			if (type === 'region') {
				setDistrictQP(null)
				setClientPolygonsQP(null)
				setClientPolygonQP(null)
			}
			if (type === 'district') {
				setClientPolygonsQP(null)
				setClientPolygonQP(null)
			}
			if (type === 'clientPolygons') {
				const clientPolygons = polygon as TClientPolygon
				id = clientPolygons.client_info_id
				setClientPolygonQP(null)
			}
			if (type === 'clientPolygon') {
				id = polygon.id
			}

			if (modeQP === 'first') {
				if (type && id) {
					setIllustrate(type)
					setIllustrateDataQP(id)
				}
			} else if (modeQP === 'second') {
				if (type && id) {
					if (type !== 'district') {
						setIllustrate(type)
						setIllustrateDataQP(id)
					}
				}
			}
		},
		[modeQP]
	)

	const handleColor = useCallback((polygon: TDistrictPolygon) => (polygon.guid ? 'lightgreen' : 'lightcoral'), [])

	//FIXME: remove redundancy
	return (
		<>
			<MapContainer
				center={[position.y, position.x]}
				minZoom={
					illustrate === 'country'
						? 5
						: illustrate === 'region'
						? 6
						: illustrate === 'district'
						? 8
						: illustrate === 'clientPolygons'
						? 10
						: illustrate === 'clientPolygon'
						? 11
						: 5
				}
				scrollWheelZoom={false}
				className='map_container'
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<MapPosition
					position={position}
					zoom={
						modeQP === 'second'
							? illustrate === 'country'
								? 5
								: illustrate === 'region'
								? 7.4
								: illustrate === 'clientPolygons'
								? 10
								: illustrate === 'clientPolygon'
								? 11
								: 5
							: illustrate === 'country'
							? 5
							: illustrate === 'region'
							? 6
							: illustrate === 'district'
							? 8
							: illustrate === 'clientPolygons'
							? 10
							: illustrate === 'clientPolygon'
							? 11
							: 5
					}
				/>

				<MapPolygons polygons={countryMutation.data} color='blue' onClick={handleClickCurrent} />

				{modeQP === 'second' ? (
					<MapPolygons polygons={regionMutation.data} color={handleColor} onClick={handleClickCurrent} />
				) : (
					<MapPolygons
						polygons={regionMutation.data}
						color={illustrate === 'region' ? 'grey' : 'blue'}
						onClick={handleClickCurrent}
					/>
				)}

				<MapPolygons polygons={districtMutation.data} color={handleColor} onClick={handleClickCurrent} />

				{illustrate !== 'region' && (
					<MapPolygons
						polygons={getChoosePolygon(regionMutation.data, districtQP)}
						color={illustrate === 'district' ? 'white' : 'blue'}
						onClick={handleClickCurrent}
					/>
				)}

				<MapPolygons
					polygons={clientPolygonsMutation.data}
					color={illustrate === 'clientPolygons' ? 'white' : 'orange'}
					onClick={handleClickCurrent}
				/>

				<MapPolygons polygons={clientPolygonMutation.data} color='white' onClick={handleClickCurrent} />

				<MapMarkers data={elevatorMarkersMutation.data} defaultIcon={LeafIcon} />
			</MapContainer>
		</>
	)
})
