import { attach, type Store } from 'effector'
import L from 'leaflet'

export interface ClearAllCirclesConfig {
	map: Store<L.Map | null>
}

export function clearAllCircles(config: ClearAllCirclesConfig) {
	const { map: $map } = config

	const clearAllCirclesFx = attach({
		source: { map: $map },
		effect: ({ map }, params: void) => {
			if (!map) throw new Error('Map is not defined')
			map.eachLayer((layer) => {
				if (layer instanceof L.Circle) {
					map.removeLayer(layer)
				}
			})
		},
	})

	return clearAllCirclesFx
}
