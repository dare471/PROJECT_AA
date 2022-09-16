import { IIllustratePolygons, TIllustrateKeys } from '@/pages/map'

export function illustrateChecker(
	illustrate: IIllustratePolygons,
	properties: TIllustrateKeys
): TIllustrateKeys
export function illustrateChecker(
	illustrate: IIllustratePolygons,
	properties: TIllustrateKeys
): boolean
export function illustrateChecker(
	illustrate: IIllustratePolygons,
	properties: TIllustrateKeys
) {
	if (properties === 'nothing') {
		return illustrate.area
			? 'area'
			: illustrate.district
			? 'district'
			: illustrate.polygon
			? 'polygon'
			: 'nothing'
	} else {
		return illustrate[properties]
	}
}
