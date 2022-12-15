import { Model, modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import React from 'react'

import { mapFactory } from '../map-model'

interface Props {
	model: Model<typeof mapFactory>
	children?: React.ReactNode
	className?: string
}

export const Map = modelView(mapFactory, function Map({ model, className, children }: Props) {
	const [mapMounted, mapUnMounted] = useUnit([model.mapMounted, model.mapUnMounted])
	const mapRef = React.useRef(null)

	React.useEffect(() => {}, [])

	React.useEffect(() => {
		if (!mapRef.current) return
		mapMounted(mapRef.current)

		return () => {
			mapUnMounted()
		}
	}, [mapRef])

	return (
		<div className={className} ref={mapRef}>
			{children}
		</div>
	)
})
