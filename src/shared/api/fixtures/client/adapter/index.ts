import { getNormalGeometriesLatLng, getNormalGuid } from '../../../adapters'
import type {
	Client,
	ClientContact,
	ClientContract,
	ClientInformalPointRef,
	ClientPlot,
	ClientPlotByCultures,
	ClientPlotByRegion,
	ClientSearchHint,
	ClientSubsidy,
} from '../types.api'
import type {
	_Client,
	_ClientContact,
	_ClientContract,
	_ClientInformalPointRef,
	_ClientLandByClient,
	_ClientLandByDistrict,
	_ClientLandByRegion,
	_ClientLandPlotByCultures,
	_ClientSearchHint,
	_ClientSubsidy,
} from './types.adapter'

export function clientsLandByRegionsAdapter(clients: _ClientLandByRegion[]): ClientPlotByRegion[] {
	const plots: ClientPlotByRegion[] = []

	clients.forEach((client) => {
		client.linkPlot.forEach((plot) => {
			plots.push({
				guid: getNormalGuid(client.guid),
				clientId: client.clientId,
				regionId: client.regionId,
				districtId: client.districtId,
				plotId: plot.plotId,
				geometryRings: getNormalGeometriesLatLng(plot.geometry_rings),
			})
		})
	})

	return plots
}

export function clientsLandByCulturesAdapter(clientsPlots: _ClientLandPlotByCultures[]): ClientPlotByCultures[] {
	const plots: ClientPlotByCultures[] = []

	clientsPlots.forEach((clientPlot) => {
		plots.push({
			guid: getNormalGuid(clientPlot.guid),
			clientId: clientPlot.clientId,
			regionId: clientPlot.regionId,
			districtId: clientPlot.districtId,
			plotId: clientPlot.plotId,
			plotName: clientPlot.name,
			plotCultId: clientPlot.cult,
			plotArea: clientPlot.area,
			geometryRings: getNormalGeometriesLatLng(clientPlot.geometry_rings),
		})
	})

	return plots
}

export function clientsLandByDistrictAdapter(
	clientsLand: _ClientLandByDistrict[],
): Pick<ClientPlot, 'guid' | 'clientId' | 'plotId' | 'geometryRings'>[] {
	return clientsLand.map((clientLand) => ({
		guid: getNormalGuid(clientLand.guid),
		clientId: clientLand.clientId,
		plotId: clientLand.plotId,
		geometryRings: getNormalGeometriesLatLng(clientLand.geometry_rings),
	}))
}

export function clientPlotsAdapter(clientLand: _ClientLandByClient): ClientPlot[] {
	const plots: ClientPlot[] = []

	clientLand.linkPlot.forEach((clientPlot) => {
		plots.push({
			guid: getNormalGuid(clientLand.guid),
			clientId: clientLand.clientId,
			clientName: clientLand.clientName,
			clientBin: clientLand.clientBin,
			clientAddress: clientLand.clientAddress,
			clientActivity: clientLand.clientAction,
			regionId: clientLand.regionId,
			districtId: clientLand.districtId,
			plotId: clientPlot.plotId,
			plotName: clientPlot.plotName,
			plotArea: clientPlot.plotArea,
			plotCultId: Number(clientPlot.plotCultId),
			plotCultName: clientPlot.plotCultName,
			geometryRings: getNormalGeometriesLatLng(clientPlot.geometry_rings),
		})
	})

	return plots
}

export function clientSearchHintsAdapter(clientSearchHints: _ClientSearchHint[]): ClientSearchHint[] {
	return clientSearchHints.map((clientSearchHint) => ({
		...clientSearchHint,
		clientBin: clientSearchHint.clientIin,
	}))
}

export function clientsAdapter(
	clients: Pick<_Client, 'guid' | 'id' | 'name' | 'iinBin' | 'activity'>[],
): Pick<Client, 'guid' | 'clientId' | 'clientName' | 'clientBin' | 'clientActivity'>[] {
	return clients.map((client) => ({
		guid: client.guid,
		clientId: client.id,
		clientName: client.name,
		clientBin: client.iinBin,
		clientActivity: client.activity,
	}))
}

export function clientAdapter(client: _Client): Client {
	return {
		guid: client.guid,
		clientId: client.id,
		clientName: client.name,
		clientBin: client.iinBin,
		clientAddress: client.address,
		clientActivity: client.activity,
		clientCato: client.cato,
		clientContacts: clientContactsAdapter(client.contacts),
		regionId: client.region,
		districtId: client.district,
	}
}

export function clientContactsAdapter(clientContacts: _ClientContact[]): ClientContact[] {
	return clientContacts.map((clientContact) => ({
		clientId: clientContact.clientId,
		contactId: clientContact.id,
		contactName: clientContact.name,
		contactPhone: clientContact.phoneNumber,
		contactEmail: clientContact.email,
		updateAuthor: clientContact.author,
		updateAuthorPosition: clientContact.position,
		updateTime: clientContact.updateTime,
		active: clientContact.actual,
	}))
}

export function clientInformalPointRefsAdapter(pointRefs: _ClientInformalPointRef[]): ClientInformalPointRef[] {
	return pointRefs.map((pointRef) => ({
		pointId: pointRef.id,
		pointName: pointRef.name,
	}))
}

export function clientSubsidiesAdapter(subsidies: _ClientSubsidy[]): ClientSubsidy[] {
	return subsidies.map((subsidy) => ({
		appNumber: subsidy.appNumber,
		appName: subsidy.applicantName,
		appBin: subsidy.applicantBin,
		providerName: subsidy.providerName,
		providerBin: subsidy.providerBin,
		appReceiverName: subsidy.appReceiverName,
		product: subsidy.product,
		sum: subsidy.sum,
		volume: subsidy.volume,
		unit: subsidy.unit,
		usageArea: subsidy.usageArea,
		appType: subsidy.appType,
		reProduction: subsidy.reProduction,
		paymentDate: subsidy.paymentDate,
		address: subsidy.address,
		activity: subsidy.activity,
	}))
}

export function clientContractsAdapter(contracts: _ClientContract[]): ClientContract[] {
	return contracts.map((contract) => ({
		id: contract.id,
		name: contract.name,
		dateCreate: contract.dateCreate,
		dateStart: contract.dateStart,
		dateEnd: contract.dateEnd,
		number: contract.number,
		success: contract.succes,
		status: contract.status,
		managerContract: contract.managerContract,
		season: contract.season,
		conditionPay: contract.conditionPay,
		deliveryMethod: contract.deliveryMethod,
		sum: contract.sum,
		additionalContract: contract.additionalContract,
		mainContract: contract.mainContract,
	}))
}
