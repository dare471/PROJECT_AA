import { IPolygon } from '@/7.shared/api'

export type TCurrentIllustrate = 'country' | 'region' | 'district' | 'polygon' | null

export interface IIllustratePolygon {
	current: TCurrentIllustrate | null
}

export interface IPosition {
	x: number
	y: number
	zoom: number
}

export interface IListPolygons extends IPolygon {
	[key: string]: any
	children?: IListPolygons
}

export type THandleChangeAction = 'request' | 'map' | 'prev'

export type TModalType = 'error' | 'comment' | null

export type TModals = {
	type: TModalType
	data: any
} | null
