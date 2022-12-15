export type YieldStructure = {
	type: 'pivotYieldStructure'
	clientIinbin: string //number
	culture: string
	season: string //number
	cropCapacity: string //number
}

export type MarketPurchaseHistory = {
	type: 'purchaseHistoryMarket'
	clientIin: string //number
	culture: string
	season: string //number
	sumSubsidies: string //number
}

export type AreaStructure = {
	type: 'areaStructure'
	clientIinbin: string //number
	culture: string
	season: string //number
	area: string //number
}

export type PurchaseHistory = {
	type: 'purchaseHistory'
	clientIinbin: string //number
	culture: string
	season: string //number
	cash: string //number
}

export interface PotentialCulture {
	type: 'potentialCult'
	clientIinbin: string //number
	culture: string
	cash: string //number
	area: string //number
}
