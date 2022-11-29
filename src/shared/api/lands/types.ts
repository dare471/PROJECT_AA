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

// export interface ClientLand {
// 	//regionId: number
// 	//districtId: number
// 	landId: string //clientLandId: number
// 	guid: string | null //number | null
// 	clientName: string
// 	clientId: string //number
// 	geometry_rings: number[][][]
// }
//
// export interface ClientLandCulture {
// 	// regionId: number
// 	// districtId: number
// 	nameCult: string
// 	fieldsCultureId: string //cultureId: number
// 	client_info_id: string //clientLandId: number
// 	color: string
// }
//
// export interface ClientLandPlot {
// 	//regionId: number
// 	//districtId: number
// 	//clientLandId: number
// 	//cultureId?: number
// }
//
// export interface RegionsRes {
// 	header: {
// 		type: 'region'
// 	}
// 	data: Region[]
// }
//
// export interface DistrictsRes {
// 	header: {
// 		type: 'district'
// 	}
// 	data: District[]
// }
//
// export interface ClientLandsRes {
// 	header: {
// 		type: 'clientLand'
// 	}
// 	data: ClientLand[]
// }
//
// export interface ClientLandCulturesRes {
// 	header: {
// 		type: 'clientLandCulture'
// 	}
// 	data: ClientLandCulture[]
// }
//
// export interface ClientLandCultureRes {
// 	header: {
// 		type: 'clientLand'
// 	}
// 	data: ClientLand[]
// }
//
// export interface ClientLandCultureFilterRes {
// 	header: {
// 		type: 'clientLandCulture'
// 	}
// 	data: ClientLandCulture[]
// }

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

export interface FilterCulture {
	cultName: string
	cultId: number
	color: string //optional
	plots: FilterCulturePlot[]
}

export interface FilterClientsRes {
	header: {
		//need to add common data pattern
	}
	data: FilterClient[]
}

export interface FilterCulturesRes {
	header: {
		//need to add common data pattern
	}
	data: FilterCulture[]
}
