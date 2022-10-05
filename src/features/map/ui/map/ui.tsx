import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FC, memo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MarkerIcon } from '@/shared/assets'
import { IMapProps } from './types'
import { MapContent } from '../content/ui'
import './styles.scss'

export const Map: FC<IMapProps> = memo(({ position, currentPolygon, handleChangeCurrentPolygon }) => {
	const LeafIcon = icon({
		iconUrl: MarkerIcon,
		iconSize: [30, 30]
	})

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
				<MapContent
					position={position}
					currentPolygon={currentPolygon}
					handleChangeCurrentPolygon={handleChangeCurrentPolygon}
				/>
				{/* <Marker position={[position.y, position.x]} icon={LeafIcon}>
					<Popup>
						<h1>Salt lake city</h1>
					</Popup>
				</Marker> */}
			</MapContainer>
		</>
	)
})
