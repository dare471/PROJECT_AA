import { attach, type Effect, type Store } from 'effector'
import type L from 'leaflet'

// FIXME: Refactor if you need
export function fitBounds<T extends Record<string, Store<{ positions: number[][][] }>>>(config: {
	map: Store<L.Map | null>
	layer: T
}): Record<keyof T, Effect<void, void>>
export function fitBounds(config: {
	map: Store<L.Map | null>
	layer: Store<{ positions: number[][][] }>
}): Effect<void, void>
export function fitBounds<T extends Record<string, Store<{ positions: number[][][] }>>>(config: {
	map: Store<L.Map | null>
	layer: Store<{ positions: number[][][] }> | T
}): Effect<void, void> | Record<keyof T, Effect<void, void>> {
	const { map: $map, layer } = config

	if (typeof layer === 'object' && !Array.isArray(layer)) {
		const layerObj = layer as T
		const fitBoundObj = {} as Record<keyof T, Effect<void, void>>

		Object.keys(layerObj).forEach((key) => {
			const $layer = layerObj[key] as Store<{ positions: number[][][] }>
			const fitBoundFx = attach({
				source: { map: $map, layer: $layer },
				effect: ({ map, layer }, params: void) => {
					if (!map) throw new Error('Map is not defined')
					if (layer.positions.length === 0) throw new Error('Positions is empty')
					map.fitBounds(layer.positions as any)
				},
			})

			fitBoundObj[key as keyof T] = fitBoundFx
		})

		return fitBoundObj
	} else {
		const $layer = layer as Store<{ positions: number[][][] }>

		const fitBoundFx = attach({
			source: { map: $map, layer: $layer },
			effect: ({ map, layer }, params: void) => {
				if (!map) throw new Error('Map is not defined')
				if (layer.positions.length === 0) throw new Error('Positions is empty')
				map.fitBounds(layer.positions as any)
			},
		})

		return fitBoundFx
	}
}
