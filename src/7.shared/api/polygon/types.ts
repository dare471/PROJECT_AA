// export interface IPolygonData {
// 	[key: string]: any
// }

// export interface IPolygon {
// 	success: boolean
// 	data: IPolygonData
// }

// export type TPolygon = IPolygon | null

// export interface IClientDetailsData {
// 	[key: string]: any
// }

// export type TClientDetails = {
// 	[key: string]: any
// 	data: IClientDetailsData[]
// } | null

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// New Types ////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @remark Типы полигонов
 */

export type TPolygonType = 'country' | 'region' | 'district' | 'clientPolygons' | 'clientPolygon'

/**
 * @remark Общий паттерн полигонов(возращающихся данных по полигонам)
 */
export type TPolygon = {
	type: TPolygonType
	id: number
	name: string
	cato: number
	klkod: number | null
	geometry_rings: number[][][] | null // number[][][]
}

/**
 * @remark Особенные возваращающиеся данные для Области и общий паттерн данных
 */

export type TRegionPolygon = {
	population_area: number
	population_city: number
	population_village: number
} & TPolygon

/**
 * @remark Особенные возваращающиеся данные для Района и общий паттерн данных
 */

export type TDistrictPolygon = {
	guid: string
	client_info_id: number
} & TPolygon

/**
 * @remark Особенные возваращающиеся данные для Клиента и общий паттерн данных
 */

export type TClientPolygon = {
	fields: number
	client_info_id: number
	guid: string
	address: string
	type_area: string
	kadastr: number
	area: number
} & TPolygon

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////// For Fix //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type _TRegionPolygon = {
	type: TPolygonType // TYPE: 'region'
	id: number // ID: string
	name: string // NAME: string
	cato: number // KATO: string
	klkod: number | null // KLKOD: string | null
	population_area: number // POPULATION_AREA: string
	population_city: number // POPULATION_CITY: string
	population_village: number // POPULATION_VILLAGE: string
	geometry_rings: number[][][] | null // GEOMETRY_RINGS: string[][][] | null
} & TPolygon

/**
 * @remark Особенные возваращающиеся данные для Района и общий паттерн
 */

type _TDistrictPolygon = {
	type: TPolygonType // TYPE: 'district'
	id: number // ID: string
	name: string // NAME: string
	cato: number // KATO: string
	klkod: number | null // string | null
	vnaim: string // Он нам нужен?
	geometry_rings: number[][][] | null // string[][][] | null
}

/**
 * @remark Особенные возваращающиеся данные для Клиента и общий паттерн
 */

type _TClientPolygon = {
	type: TPolygonType // нету типов здесь также его нету в еще одном месте там где уже обращаемся к конкретному полигону клиента
	id: number // ID: string
	name: string // NAME: string
	cato: number // CATO: string
	klkod: number | null // здесь его нету незнаю нужен ли но ок если что просто из типов уберу
	fields: number // FIELDS: string
	client_info_id: number // CLIENT_INFO_ID: string
	guid: string | null // GUID: string | null
	address: string // ADDRESS: string
	field_type: string // TYPE здесь лучшее с TYPE на field_type: string
	kadastr: number // KADASTR: string
	area: number // AREA: string
	geometry_rings: number[][][] | null // string[][][] | null
}
