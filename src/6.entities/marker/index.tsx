import { Marker, Popup } from 'react-leaflet'

type TMapMarkersProps = {
	data?: any
	defaultIcon: any
}

export const MapMarkers = ({ data, defaultIcon }: TMapMarkersProps) => {
	return (
		<>
			{data &&
				data.map((item: any, index: number) => (
					<Marker
						key={`${item}-${index}`}
						position={[item.LATITUDE, item.LONGITUDE]}
						icon={item.icon ? item.icon : defaultIcon}
					>
						<Popup>
							<div>
								<h5>
									<span>{`Названия: `}</span>
									{item.NAME}
								</h5>
								<br></br>
								<h5>
									<span>{`ИИН: `}</span>
									{item.BIN}
								</h5>
								<br></br>
								<h5>
									<span>{`Адрес: `}</span>
									{item.LOCATION}
								</h5>
								<br></br>
								<h5>
									<span>{`Станция: `}</span>
									{item.STATION}
								</h5>
								<br></br>
								<h5>
									<span>{`Контакты: `}</span>
									{item.CONTACTS}
								</h5>
							</div>
						</Popup>
					</Marker>
				))}
		</>
	)
}
