import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FC, memo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useSearchParams } from 'react-router-dom'
import { TCurrentIllustrate } from '@/3.pages'
import { MarkerIcon } from '@/7.shared/assets'
import { IMapProps } from './types'
import { findChoosePolygon, useMapSpecific } from '../../lib'
import { MapPolygons } from '../polygon'
import { MapPosition } from '../position'
import './styles.scss'

export const Map: FC<IMapProps> = memo(
	({ countryMutation, regionMutation, districtMutation, clientMutation, clientPolygonMutation, position }) => {
		const { setParam, setChangedParam } = useMapSpecific()
		const [searchParams] = useSearchParams()
		const districtParam = searchParams.get('district')
		const illustrateParam = searchParams.get('illustrate') as TCurrentIllustrate

		const LeafIcon = icon({
			iconUrl: MarkerIcon,
			iconSize: [30, 30]
		})

		const handleClickCurrent = (polygon: any) => {
			let type: any = polygon.type
			let id: any = polygon.KATO || polygon.CLIENT_INFO_ID

			if (polygon.type === 'polygon') {
				type = 'client'
			}

			if (!polygon.type) {
				type = 'clientPolygon'
				id = polygon.ID
			}

			if (type && id) {
				setParam(type, id)
				setChangedParam('map')
			}
		}

		const handleClickPrev = (polygon: any) => {
			console.log(polygon)
		}

		return (
			<>
				<MapContainer
					center={[position.y, position.x]}
					zoom={position.zoom}
					scrollWheelZoom={false}
					className='map_container'
					maxZoom={13}
					minZoom={5}
				>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
					<MapPosition position={position} />

					{countryMutation.data?.data && (
						<MapPolygons polygons={countryMutation.data.data} color='blue' onClick={handleClickCurrent}></MapPolygons>
					)}
					{regionMutation.data?.data && (
						<MapPolygons
							polygons={regionMutation.data.data}
							color={illustrateParam === 'region' ? 'grey' : 'blue'}
							onClick={handleClickCurrent}
						></MapPolygons>
					)}
					{districtMutation.data?.data && (
						<MapPolygons
							polygons={districtMutation.data.data}
							color={(polygon: any) => {
								return polygon.GUID ? 'lightgreen' : 'lightcoral'
							}}
							onClick={handleClickCurrent}
						></MapPolygons>
					)}
					{regionMutation.data?.data && districtParam && illustrateParam !== 'region' && (
						<MapPolygons
							polygons={findChoosePolygon(regionMutation.data.data, districtParam)}
							color={illustrateParam === 'district' ? 'white' : 'blue'}
							onClick={handleClickCurrent}
						></MapPolygons>
					)}
					{clientMutation.data?.data && (
						<MapPolygons
							polygons={clientMutation.data.data}
							color={illustrateParam === 'client' ? 'white' : 'orange'}
							onClick={handleClickCurrent}
						></MapPolygons>
					)}
					{clientPolygonMutation.data?.data && (
						<MapPolygons
							polygons={clientPolygonMutation.data.data}
							color='white'
							onClick={handleClickCurrent}
						></MapPolygons>
					)}

					{/* <Marker position={[position.y, position.x]} icon={LeafIcon}>
					<Popup>
						<h1>Salt lake city</h1>
					</Popup>
				</Marker> */}
				</MapContainer>
			</>
		)
	}
)
