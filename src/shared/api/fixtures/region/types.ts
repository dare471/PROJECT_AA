export type RegionLand = {
	id: string //number
	type: 'region' | 'regionBilling'
	name: string
	population_area: string //number
	geometry_rings: number[][][]
}

export type RegionAnalytic = {
	year: number
	regionName: string
	regionId: number
	clientProcAA: number
	clientProcOth: number
	clientCountAll: number
	clientCountAA: number
	clientCountOth: number
	clientAreaAAProc: number
	clientAreaOthProc: number
	clientAreaAll: number
	clientAreaAA: number
	clientAreaOth: number
}
