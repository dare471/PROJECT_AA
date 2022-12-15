export interface Region {
	type: 'region'
	regionId: number
	name: string
	population_area: number
	geometry_rings: number[][][]
}

export interface District {
	type: 'district'
	// regionId: number
	districtId: number
	name: string
	klkod: number
	geometry_rings: number[][][]
}

export interface RegionsRes {
	header: null
	data: Region[]
}

export interface DistrictsRes {
	header: null
	data: District[]
}

export interface FilterClientPlot {
	area: number
	field: string //optional
	info: string //optional
	cultName: string
	cultId: number
	color: string //optional
	geometry: number[][][]
}

export interface FilterClient {
	regionId: number
	districtId: number
	clientLandId: number

	regionName: string //optional
	districtName: string //optional
	clientName: string
	guid: number
	plots: FilterClientPlot[]
}

export interface FilterCulturePlot {
	regionId: number
	districtId: number
	clientLandId: number

	regionName: string
	districtName: string
	clientName: string
}

export interface Culture {
	cultureId: string
	cultureName: string
}

export interface CulturesRes {
	data: Culture[]
}
