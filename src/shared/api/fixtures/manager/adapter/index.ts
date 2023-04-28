import type { ManagersFromTo } from '../types.api'
import type { _ManagersFromTo } from './adapter.types'

export class ManagerAdapter {
	public static fromApiToCountries(res: ManagersFromTo): Array<ManagersFromTo> {
		const countries: Array<ManagersFromTo> = []

		for (const key in res) {
			const country = res[key] as _ManagersFromTo

			if (key === 'AsiaAfrica') {
				countries.push({ countryFrom: 'asia', countryTo: 'africa', progress: country.progress, managers: country.data })
			} else if (key === 'AfricaEurope') {
				countries.push({
					countryFrom: 'africa',
					countryTo: 'europe',
					progress: country.progress,
					managers: country.data,
				})
			} else if (key === 'EuropeUsa') {
				countries.push({ countryFrom: 'europe', countryTo: 'usa', progress: country.progress, managers: country.data })
			} else if (key === 'UsaAntartica') {
				countries.push({
					countryFrom: 'usa',
					countryTo: 'antarctica',
					progress: country.progress,
					managers: country.data,
				})
			} else if (key === 'AntarticaAustralia') {
				countries.push({
					countryFrom: 'antarctica',
					countryTo: 'australia',
					progress: country.progress,
					managers: country.data,
				})
			} else if (key === 'AustraliaAsia') {
				countries.push({
					countryFrom: 'australia',
					countryTo: 'asia',
					progress: country.progress,
					managers: country.data,
				})
			}
		}

		return countries
	}
}
