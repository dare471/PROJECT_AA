import L from 'leaflet'

import type {
	ClientContact,
	ClientInfo,
	ClientLandPlot,
	ClientLandShortPlot,
	ClientSearchHint,
	DistrictLand,
	RegionLand,
} from '../fixtures'

//////////////////////////////////////////////// Region ///////////////////////////////////////////////////////
export function regionsAdapter(regions: RegionLand[]): RegionLand[] {
	return regions.map((region) => ({
		...region,
		geometry_rings: getNormalGeometries(region.geometry_rings),
	}))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// District /////////////////////////////////////////////////////
export function districtsAdapter(districts: DistrictLand[]): DistrictLand[] {
	return districts.map((district) => ({
		...district,
		geometry_rings: getNormalGeometries(district.geometry_rings),
	}))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// Client ///////////////////////////////////////////////////////
interface _ClientLandPlot {
	plotId: number
	plotCultId: string
	plotName: string
	plotArea: number
	plotCultName: string
	geometry_rings: number[][][]
}

interface _ClientLandShortPlot {
	plotId: number
	geometry_rings: number[][][]
}

interface _ClientLand {
	guid: 0 | 1
	clientId: number
	clientName: string
	clientBin: string
	clientAddress: string
	clientAction: string

	regionId: number
	districtId: number
	linkPlot: _ClientLandPlot[]
}

interface _ClientShortLand {
	guid: 0 | 1
	clientId: number

	regionId: number
	districtId: number
	linkPlot: _ClientLandShortPlot[]
}

interface _ClientInfo {
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

interface _ClientContact {
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

interface _ClientSearchHint {
	clientId: number
	clientName: string
	clientIin: number
}

export function clientsPlotsAdapter(clients: _ClientShortLand[]): ClientLandShortPlot[] {
	const plots: ClientLandShortPlot[] = []

	clients.forEach((client) => {
		client.linkPlot.forEach((plot) => {
			plots.push({
				...plot,
				geometry_rings: getNormalGeometriesLatLng(plot.geometry_rings),
				guid: client.guid,
				clientId: client.clientId,
				regionId: client.regionId,
				districtId: client.districtId,
			})
		})
	})

	return plots
}

export function clientPlotsByRegionAdapter(client: _ClientLand): ClientLandPlot[] {
	const plots: ClientLandPlot[] = []

	client.linkPlot.forEach((plot) => {
		plots.push({
			...plot,
			geometry_rings: getNormalGeometriesLatLng(plot.geometry_rings),
			guid: client.guid,
			clientId: client.clientId,
			clientName: client.clientName,
			clientBin: client.clientBin,
			clientAddress: client.clientAddress,
			clientActivity: client.clientAction,
			regionId: client.regionId,
			districtId: client.districtId,
		})
	})

	return plots
}

export function clientsPlotsByCulturesAdapter(plots: ClientLandPlot[]): ClientLandPlot[] {
	return plots.map((plot) => ({
		...plot,
		geometry_rings: getNormalGeometriesLatLng(plot.geometry_rings),
	}))
}

export function clientSearchHintsAdapter(clientSearchHints: _ClientSearchHint[]): ClientSearchHint[] {
	return clientSearchHints.map((clientSearchHint) => ({
		...clientSearchHint,
		clientBin: clientSearchHint.clientIin,
	}))
}

export function clientsInfoAdapter(clientsInfo: _ClientInfo[]): ClientInfo[] {
	return clientsInfo.map(clientInfoAdapter)
}

export function clientInfoAdapter(clientInfo: _ClientInfo): ClientInfo {
	return {
		guid: clientInfo.guid,
		clientId: clientInfo.id,
		clientName: clientInfo.name,
		clientBin: clientInfo.iinBin,
		clientAddress: clientInfo.address,
		clientActivity: clientInfo.activity,
		clientCato: clientInfo.cato,
		clientRegionId: clientInfo.region,
		clientDistrictId: clientInfo.district,
		clientContacts: clientContactsAdapter(clientInfo.contacts),
	}
}

export function clientContactsAdapter(clientContacts: _ClientContact[]): ClientContact[] {
	return clientContacts.map((clientContact) => ({
		clientId: clientContact.clientId,
		contactId: clientContact.id,
		contactName: clientContact.name,
		contactPhone: clientContact.phoneNumber,
		contactEmail: clientContact.email,
		contactPosition: clientContact.position,
		updateAuthor: clientContact.author,
		updateTime: clientContact.updateTime,
		active: clientContact.actual,
	}))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////// Functions /////////////////////////////////////////////////////
export function getNormalGeometries(geometries: number[][][]): number[][][] {
	try {
		const proj = L.CRS.EPSG3857

		if (geometries) {
			const newGeometries = geometries[0]!.map((geometry: any) => {
				const newGeometry = proj.unproject(new L.Point(geometry[0], geometry[1]))
				return [newGeometry.lat, newGeometry.lng]
			})

			return [newGeometries]
		}

		return geometries
	} catch (err) {
		throw err
	}
}

export function getNormalGeometriesLatLng(geometries: number[][][]): number[][][] {
	return [geometries['0']!.map((latlng) => [latlng[1]!, latlng[0]!])]
}
