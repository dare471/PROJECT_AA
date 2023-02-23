import { createClientAnalyticsByYear, createClientPlots } from './model'
import { ClientAnalyticsByYear, ClientPlots } from './ui'

export {
	ClientShortCard,
	ClientCard,
	ClientContacts,
	ClientContactCard,
	ClientLastContractCard,
	ClientContractCard,
} from './ui'
export {
	createClientsLand,
	createClient,
	createClients,
	filterClientsPlotsInCircleFx,
	createClientManagers,
	createClientSubsidies,
	createClientContracts,
	createClientLastContract,
	createClientPoints,
} from './model'

export const ClientAnalyticsByYearFactory = {
	ClientAnalyticsByYear,
	createClientAnalyticsByYear,
}

export const ClientPlotsFactory = {
	ClientPlots,
	createClientPlots,
}
