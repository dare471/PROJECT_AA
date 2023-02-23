import { type ReactSelectProps, SelectFactory } from '~src/shared/ui'

import type { createRegionSelect } from './model'

interface RegionSelectProps extends ReactSelectProps {
	model: ReturnType<typeof createRegionSelect>
}

export function RegionSelect(props: RegionSelectProps) {
	const { model } = props

	return <SelectFactory.Select model={model.selectModel} />
}
