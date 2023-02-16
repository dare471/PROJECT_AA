export type ClientInfo = ShortClientInfo & {
	clientRegionId: number
	clientDistrictId: number
	clientCato: number
	clientContacts: ClientContact[]
}

export type ShortClientInfo = {
	guid: boolean
	clientId: number
	clientName: string
	clientBin: number
	clientAddress: string
	clientActivity: string
}

export type FavoriteClientInfo = {
	id: number

	clientId: number
	clientName: string
	clientBin: number
	clientAddress: string

	meetingType: { id: number; name: string }[]
	meetingPlace: { id: number; name: string }[]
}

export type ClientContact = {
	clientId: number
	contactId: number
	contactPosition: string | null
	contactName: string
	contactPhone: number
	contactEmail: string | null
	updateAuthor: string | null
	updateTime: string | null
	active: boolean
}

export type ClientLandPlot = {
	guid: 0 | 1
	plotId: number
	plotCultId: string
	plotName: string
	plotArea: number
	plotCultName: string
	geometry_rings: number[][][]

	clientId: number
	clientName: string
	clientBin: string
	clientAddress: string
	clientActivity: string

	regionId: number
	districtId: number
}

export type ClientLandShortPlot = {
	guid: 0 | 1
	plotId: number
	geometry_rings: number[][][]

	clientId: number

	regionId: number
	districtId: number
}

export type ClientAnalytic = {
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

export type ClientSearchHint = {
	clientId: number
	clientName: string
	clientBin: number
}

export type ClientOffice = {
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

export type ClientInformalPointRef = {
	id: number
	name: string
}
