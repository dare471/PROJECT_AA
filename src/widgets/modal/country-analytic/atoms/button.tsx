import { modelView } from 'effector-factorio'
import { useEvent } from 'effector-react'
import styled from 'styled-components'

import { Button } from '~src/shared/ui'

import { countryAnalyticModalFactory } from '../model'

export const CountryAnalyticsModalButton = modelView(countryAnalyticModalFactory, ({ model }) => {
	const handleClick = useEvent(model.modalModel.openClicked)

	return (
		<StyledCountryAnalyticsModalButton onClick={() => handleClick()}>
			Сводная информация субсидии по стране
		</StyledCountryAnalyticsModalButton>
	)
})

const StyledCountryAnalyticsModalButton = styled(Button)`
	padding: 0.5rem 1rem;
`
