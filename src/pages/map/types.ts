export interface IIllustratePolygons {
	area: boolean
	district: boolean
	polygon: boolean
}

export type TIllustrateKeys = 'area' | 'district' | 'polygon' | 'nothing'

export interface IPosition {
	x: number
	y: number
	zoom: number
}
