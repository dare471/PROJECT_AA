export interface Client {
	guid: boolean
	clientId: number
	clientName: string
	clientBin: number
	clientAddress: string
	clientActivity: string
	clientCato: number
	clientContacts: ClientContact[]
	regionId: number
	districtId: number
}

export interface ClientContact {
	contactId: number
	contactName: string
	contactPhone: number
	contactEmail: string | null
	clientId: number
	updateAuthor: string | null
	updateAuthorPosition: string | null
	updateTime: string | null
	active: boolean
}

export interface ClientPlot {
	guid: boolean
	clientId: number
	clientName: string
	clientBin: string
	clientAddress: string
	clientActivity: string
	regionId: number
	districtId: number
	plotId: number
	plotName: string
	plotArea: number
	plotCultId: number
	plotCultName: string
	geometryRings: number[][][]
}

export type ClientPlotByRegion = Pick<
	ClientPlot,
	'guid' | 'clientId' | 'regionId' | 'districtId' | 'plotId' | 'geometryRings'
>

export type ClientPlotByCultures = Pick<
	ClientPlot,
	'guid' | 'clientId' | 'regionId' | 'districtId' | 'plotId' | 'plotName' | 'plotArea' | 'plotCultId' | 'geometryRings'
>

export interface ClientAnalytic {
	year: number
	sumSubsClient: number
	foreignMarkSumSubcides: number
	percentSubs: number
	productName: string
	region: number
	sumVolumeClient: number
	foreignMarkSumVolume: number
	percentVolume: number
	culture: string
}

export interface ClientSearchHint {
	clientId: number
	clientName: string
	clientBin: number
}

export interface ClientOffice {
	clientCoordinate: {
		lat: number
		lng: number
	}
	officeCoordinate: {
		lat: number
		lng: number
	}
	directionMatrix: {
		destination_addresses: string
		origin_addresses: string
		rows: {
			elements: {
				distance: {
					text: string
					value: number
				}
				duration: {
					text: string
					value: number
				}
			}[]
		}[]
	}
}

export interface ClientInformalPointRef {
	pointId: number
	pointName: string
}

export interface ClientManager {
	id: number
	name: string
	direction: string
	position: string
	season: string
}

export interface ClientSubsidy {
	appNumber: string
	appName: string
	appReceiverName: string
	appBin: number
	providerName: string
	providerBin: number
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

export interface ClientContract {
	id: number
	name: string
	dateCreate: string
	dateStart: string
	dateEnd: string
	number: string
	success: boolean
	status: string
	managerContract: string
	season: string
	conditionPay: string
	deliveryMethod: string
	sum: number
	additionalContract: string
	mainContract: string
}

export interface ClientLastContract {
	id: number
	name: string
	number: string
	dateStart: string
	dateEnd: string
	status: string
	client: string
	manager: string
	season: string
	deliveryAddress: string
	sum: number
}

export interface ClientPoint {
	id: number
	clientId: number
	name: string
	category: string
	coordinate: [number, number]
}
