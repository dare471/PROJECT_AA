import { createEffect } from 'effector'
import L from 'leaflet'

export const fitBoundsFx = createEffect<{ map: L.Map | null; positions: number[][][] }, void>(({ map, positions }) => {
	if (!map) throw new Error('Map is not defined')
	if (positions.length === 0) throw new Error('Positions is empty')
	map.fitBounds(positions as any)
})

export const clearAllCirclesFx = createEffect<{ map: L.Map | null }, void>(({ map }) => {
	if (!map) throw new Error('Map is not defined')
	map.eachLayer((layer) => {
		if (layer instanceof L.Circle) {
			map.removeLayer(layer)
		}
	})
})
