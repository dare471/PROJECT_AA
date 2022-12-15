import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { Button } from '~src/shared/ui'

import { purchaseHistoriesAnalyticModalFactory } from '../model'

export const PurchaseHistoriesAnalyticsModalButton = modelView(
	purchaseHistoriesAnalyticModalFactory,
	({ model }) => {
		const [handleClick, visible] = useUnit([model.modalModel.openClicked, model.$buttonVisible])

		if (!visible) return null

		return (
			<StyledCountryAnalyticsModalButton onClick={() => handleClick()}>
				Получить историю закупа
			</StyledCountryAnalyticsModalButton>
		)
	}
)

const StyledCountryAnalyticsModalButton = styled(Button)`
	padding: 0.5rem 1rem;
`
