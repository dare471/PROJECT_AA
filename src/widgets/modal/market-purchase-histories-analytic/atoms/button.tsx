import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { Button } from '~src/shared/ui'

import { marketPurchaseHistoriesAnalyticModalFactory } from '../model'

export const MarketPurchaseHistoriesAnalyticsModalButton = modelView(
	marketPurchaseHistoriesAnalyticModalFactory,
	({ model }) => {
		const [handleClick, visible] = useUnit([model.modalModel.openClicked, model.$buttonVisible])

		if (!visible) return null

		return (
			<StyledCountryAnalyticsModalButton onClick={() => handleClick()}>
				История закупа по рынку
			</StyledCountryAnalyticsModalButton>
		)
	}
)

const StyledCountryAnalyticsModalButton = styled(Button)`
	padding: 0.5rem 1rem;
`
