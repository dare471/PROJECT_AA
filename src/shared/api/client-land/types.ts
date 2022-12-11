export interface ClientLand {
	_id: {
		$oid: string
	}
	clientId: number
	guid: 0 | 1
	regionId: number
	districtId: number
	linkPlot: ClientLandPlot[]
}

export interface ClientLandPlot {
	plotId: number
	geometry_rings: number[][][]
}

export interface ClientLandPlotCulture {
	_id: {
		$oid: string
	}
	plotid: number //plotId
	plotName: string
	clientId: number
	plotArea: number
	plotCult: number
	plotRegion: number
	plotDistrict: number
	linkPlot: number[][][]
}
