import { useUnit } from 'effector-react'

import { type ReactSelectProps, SelectFactory } from '~src/shared/ui'

import type { createCulturesSelect } from './model'

interface CultureSelectProps extends ReactSelectProps {
	model: ReturnType<typeof createCulturesSelect>
}

export function CulturesSelect(props: CultureSelectProps) {
	const { model, ...otherProps } = props
	const [culturesRefPending] = useUnit([model.$culturesRefPending])

	return <SelectFactory.Select model={model.$$select as any} isLoading={culturesRefPending} {...otherProps} />
}
