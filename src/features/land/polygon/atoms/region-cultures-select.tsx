import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import Select from 'react-select'
import styled from 'styled-components'

import { landFactory } from '~src/features/land/polygon/model'

import { theme } from '~src/shared/lib'

interface Props {
	className?: string
}

export const RegionCulturesSelect = modelView(landFactory, ({ className }: Props) => {
	const model = landFactory.useModel()
	const [regionCultures, regionCulturesPending] = useUnit([
		model.$regionCultures,
		model.getRegionCulturesFx.pending
	])

	const options = regionCultures
		? regionCultures.map((culture) => ({
				label: culture.cultureName,
				value: culture.cultureId
		  }))
		: []

	return (
		<Container className={className}>
			<Select options={options} isLoading={regionCulturesPending} />
		</Container>
	)
})

const Container = styled.div`
	width: 200px;

	background-color: var(${theme.palette.primary600});
`
