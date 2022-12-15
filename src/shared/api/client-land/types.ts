export interface ClientLand {
	_id: {
		$oid: string
	}
	clientId: number
	guid: 0 | 1
	regionId: number
	districtId: number
	linkPlot: ClientLandLinkPlot[]
}

export interface ClientLandLinkPlot {
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

export interface ClientLandPlot {
	_id: {
		$oid: '63915be54737b83f21e1da19'
	}
	clientId: number
	clientAddress: string
	guid: 0 | 1
	clientName: string
	clientBin: string
	clientAction: string
	regionId: number
	districtId: number
	linkPlot: ClientLandPlotLinkPlot[]
}

export interface ClientLandPlotLinkPlot {
	plotId: number
	plotName: string
	plotArea: number
	plotCultId: string //number
	plotCultName: string
	geometry_rings: number[][][]
}
