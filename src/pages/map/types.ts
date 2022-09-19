export type TCurrentIllustrate = 'area' | 'district' | 'polygon' | null

export interface IIllustratePolygons {
	current: TCurrentIllustrate
}

export type TIllustrateKeys = 'area' | 'district' | 'polygon' | 'nothing'

export interface IPosition {
	x: number
	y: number
	zoom: number
}
