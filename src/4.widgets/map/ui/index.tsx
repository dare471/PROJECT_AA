import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FC, memo, useCallback } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useQueryParam } from 'use-query-params'
import { MapPolygons } from '@/6.entities/polygon'
import { MarkerIcon } from '@/7.shared/assets'
import { IMapProps } from './types'
import { findChoosePolygon } from '../lib'
import { MapPosition } from './position'
import './styles.scss'

export const Map: FC<IMapProps> = memo(({ handleMutation, position, illustrate, setIllustrate }) => {
	const [districtQP, setDistrictQP] = useQueryParam('district')
	const [clientQP, setClientQP] = useQueryParam('client')
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon')
	const [countryMutation] = handleMutation('country')
	const [regionMutation] = handleMutation('region')
	const [districtMutation] = handleMutation('district')
	const [clientMutation] = handleMutation('client')
	const [clientPolygonMutation] = handleMutation('clientPolygon')

	const LeafIcon = icon({
		iconUrl: MarkerIcon,
		iconSize: [30, 30]
	})

	const handleClickCurrent = useCallback((polygon: any, illustrateDataQP: any, setIllustrateDataQP: any) => {
		const type = !polygon.type ? 'clientPolygon' : polygon.type === 'polygon' ? 'client' : polygon.type
		const id = !polygon.type ? polygon.ID : polygon.KATO || polygon.CLIENT_INFO_ID

		if (type === 'region') {
			setDistrictQP(null)
			setClientQP(null)
			setClientPolygonQP(null)
		}
		if (type === 'district') {
			setClientQP(null)
			setClientPolygonQP(null)
		}
		if (type === 'client') {
			setClientPolygonQP(null)
		}

		if (type && id) {
			setIllustrate(type)
			setIllustrateDataQP(id)
		}
	}, [])

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
						: illustrate === 'client'
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
						illustrate === 'country'
							? 5
							: illustrate === 'region'
							? 6
							: illustrate === 'district'
							? 8
							: illustrate === 'client'
							? 10
							: illustrate === 'clientPolygon'
							? 11
							: 5
					}
				/>

				{countryMutation.data?.data && (
					<MapPolygons polygons={countryMutation.data.data} color='blue' onClick={handleClickCurrent} />
				)}
				{regionMutation.data?.data && (
					<MapPolygons
						polygons={regionMutation.data.data}
						color={illustrate === 'region' ? 'grey' : 'blue'}
						onClick={handleClickCurrent}
					/>
				)}
				{districtMutation.data?.data && (
					<MapPolygons
						polygons={districtMutation.data.data}
						color={(polygon: any) => {
							return polygon.GUID ? 'lightgreen' : 'lightcoral'
						}}
						onClick={handleClickCurrent}
					/>
				)}
				{regionMutation.data?.data && districtQP && illustrate !== 'region' && (
					<MapPolygons
						polygons={findChoosePolygon(regionMutation.data.data, districtQP)}
						color={illustrate === 'district' ? 'white' : 'blue'}
						onClick={handleClickCurrent}
					/>
				)}
				{clientMutation.data?.data && (
					<MapPolygons
						polygons={clientMutation.data.data}
						color={illustrate === 'client' ? 'white' : 'orange'}
						onClick={handleClickCurrent}
					/>
				)}
				{clientPolygonMutation.data?.data && (
					<MapPolygons polygons={clientPolygonMutation.data.data} color='white' onClick={handleClickCurrent} />
				)}

				{/* <Marker position={[position.y, position.x]} icon={LeafIcon}>
					<Popup>
						<h1>Salt lake city</h1>
					</Popup>
				</Marker> */}
			</MapContainer>
		</>
	)
})
