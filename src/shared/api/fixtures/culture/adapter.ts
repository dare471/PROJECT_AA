import type { CultureRef } from './types'

interface _CultureRef {
	id: number
	name: string
}

export function culturesRefAdapter(culturesRef: _CultureRef[]): CultureRef[] {
	return culturesRef.map((culture) => ({
		cultureId: culture.id,
		cultureName: culture.name,
	}))
}
