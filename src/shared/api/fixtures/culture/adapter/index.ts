import type { CultureRef } from '../types.api'
import type { _CultureRef } from './types.adapter'

export class CultureAdapter {
	public static fromApiToCulturesRefs(data: _CultureRef[]): CultureRef[] {
		return data.map((item) => ({
			cultureId: item.id,
			cultureName: item.name,
		}))
	}
}
