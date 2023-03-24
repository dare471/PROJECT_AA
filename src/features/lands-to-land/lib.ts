import type { Land } from './model'

export function getLandsPositions<T extends Pick<Land, 'geometryRings'>>(lands: T[]) {
	const positions: number[][][] = []

	lands.forEach((region) => {
		positions.push(region.geometryRings[0]!)
	})

	return positions
}
