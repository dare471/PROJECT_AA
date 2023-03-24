export interface _Client {
	guid: boolean
	id: number
	address: string
	name: string
	iinBin: number
	cato: number
	activity: string
	district: number
	region: number
	contacts: _ClientContact[]
}

export interface _ClientContact {
	clientId: number
	id: number
	position: string | null
	name: string
	phoneNumber: number
	email: string | null
	author: string | null
	updateTime: string | null
	actual: boolean
}

export interface _ClientLandByRegion {
	clientId: number
	guid: 0 | 1
	linkPlot: {
		plotId: number
		geometry_rings: number[][][]
	}[]
	regionId: number
	districtId: number
}

export interface _ClientLandPlotByCultures {
	guid: 0 | 1
	clientId: number
	regionId: number
	districtId: number
	name: string
	plotId: number
	area: number
	cult: number
	geometry_rings: number[][][]
}

export interface _ClientLandByDistrict {
	guid: 0 | 1
	clientId: number
	plotId: number
	geometry_rings: number[][][]
}

export interface _ClientLandByClient {
	clientId: number
	clientAddress: string
	guid: 0 | 1
	clientName: string
	clientBin: string
	clientAction: string
	regionId: number
	districtId: number
	linkPlot: {
		plotId: number
		plotCultId: string
		plotName: string
		plotArea: number
		plotCultName: string
		geometry_rings: number[][][]
	}[]
}

export interface _ClientPlot {
	plotId: number
	plotName: string
	plotArea: number
	plotCultName: string
	plotCultId: string
	geometry_rings: number[][][]
}

export interface _ClientSearchHint {
	clientId: number
	clientName: string
	clientIin: number
}

export interface _ClientInformalPointRef {
	id: number
	name: string
}

export interface _ClientSubsidy {
	appNumber: string
	applicantName: string
	applicantBin: number
	providerName: string
	providerBin: number
	appReceiverName: string
	product: string
	sum: number
	volume: number
	unit: string
	usageArea: number
	appType: string
	reProduction: string
	paymentDate: string
	address: string | null
	activity: string
}

export interface _ClientContract {
	id: number
	name: string
	dateCreate: string
	dateStart: string
	dateEnd: string
	number: string
	succes: boolean
	status: string
	managerContract: string
	season: string
	conditionPay: string
	deliveryMethod: string
	sum: number
	additionalContract: string
	mainContract: string
}
