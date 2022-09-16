import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FC } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { MarkerIcon } from '@/shared/assets'
import { IMapProps } from './types'
import { MapContent } from '../content/ui'
import './styles.scss'

export const Map: FC<IMapProps> = ({
	position,
	areaPolygons,
	districtPolygons,
	illustratePolygons,
	polygons,
	setIllustratePolygons,
	activePolygon,
	setActivePolygon
}) => {
	const LeafIcon = icon({
		iconUrl: MarkerIcon,
		iconSize: [30, 30]
	})

	return (
		<>
			<MapContainer
				center={[position.y, position.x]}
				zoom={5}
				scrollWheelZoom={false}
				className='map_container'
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<MapContent
					position={position}
					areaPolygons={areaPolygons}
					districtPolygons={districtPolygons}
					illustratePolygons={illustratePolygons}
					polygons={polygons}
					setIllustratePolygons={setIllustratePolygons}
					activePolygon={activePolygon}
					setActivePolygon={setActivePolygon}
				/>
				<Marker position={[position.y, position.x]} icon={LeafIcon}>
					<Popup>
						<h1>Salt lake city</h1>
					</Popup>
				</Marker>
			</MapContainer>
		</>
	)
}
