export type Country = 'asia' | 'africa' | 'europe' | 'usa' | 'antarctica' | 'australia'

export interface ManagersFromTo {
	countryFrom: Country
	countryTo: Country
	progress: number | null
	managers: Array<ManagersFromToManager>
}

export interface ManagersFromToManager {
	user: string
	sumMoney: string
	newClient: number
	score: number
	rank: number
}

export interface ManagersSalesResult {
	title: string
	actualSum: string
	planSum: string
	progress: string
}
