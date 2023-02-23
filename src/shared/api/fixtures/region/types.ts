export type Region = {
	type: 'region'
	id: number
	name: string
	populationArea: number
	geometryRings: number[][][]
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
