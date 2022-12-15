export type LandAnalytic = {
	category: string
	season: string //number
	cash: string //number
	area: string //number
	count: string //number
	factCount: string | null //number
}

export type CountryAnalytic = {
	type: 'pivotSubsideRegion'
} & LandAnalytic

export type RegionAnalytic = {
	type: 'pivotSubsideCountry'
} & LandAnalytic
