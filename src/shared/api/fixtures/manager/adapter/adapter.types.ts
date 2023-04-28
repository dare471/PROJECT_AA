export interface _Countries {
	AsiaAfrica: _ManagersFromTo
	AfricaEurope: _ManagersFromTo
	EuropeUsa: _ManagersFromTo
	UsaAntartica: _ManagersFromTo
	AntarticaAustralia: _ManagersFromTo
	AustraliaAsia: _ManagersFromTo
}

export interface _ManagersFromTo {
	progress: number | null
	data: Array<_CountryManager>
}

export interface _CountryManager {
	user: string
	sumMoney: string
	newClient: number
	score: number
	rank: number
}
