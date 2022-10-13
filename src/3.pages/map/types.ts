import { IPolygon } from '@/7.shared/api'

export type TIllustrate = 'country' | 'region' | 'district' | 'client' | 'clientPolygon' | null

export type TMode = 'true' | 'false'

export interface IIllustratePolygon {
	current: TIllustrate | null
}

export type THandleChangeAction = 'request' | 'map' | 'prev'

export type TModalType = 'error' | 'comment' | 'confirm' | null

export type TModals = {
	type: TModalType
	data: any
} | null

export interface IPosition {
	x: number
	y: number
	zoom: number
}

export interface IListPolygons extends IPolygon {
	[key: string]: any
	children?: IListPolygons
}

export type TSuccessActions = 'position' | 'list' | 'list-change' | 'client-info' | 'session-country'
export type TErrorActions = 'delete' | 'modal'
