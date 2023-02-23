import { type Store } from 'effector'

import { type Region } from '~src/shared/api'
import { type Option, SelectFactory } from '~src/shared/ui'

interface CreateRegionSelectOptions {
	regions: Store<Region[]>
}

export function createRegionSelect(options: CreateRegionSelectOptions) {
	const { regions: $regions } = options

	const selectModel = SelectFactory.createSelect({
		defaultOptions: $regions.map((regions) =>
			regions.map((region) => ({ value: region.id, label: region.name } as Option)),
		),
		isMulti: false,
	})

	return {
		selectModel,
	}
}
