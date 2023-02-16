import { useUnit } from 'effector-react'
import React from 'react'

import type { ClientLandPlot } from '~src/shared/api'

import { type createClientPlots } from './model'

interface ClientPlotsProps {
	model: ReturnType<typeof createClientPlots>
	renderPlots: (params: { item: ClientLandPlot; onClick: (payload: number) => number }) => React.ReactNode
	renderPlot: (params: { data: ClientLandPlot; onClick: (payload: number) => number }) => React.ReactNode
	fitBounds?: boolean
}

export const ClientPlots = (props: ClientPlotsProps) => {
	const { model, renderPlots, renderPlot, fitBounds = true } = props
	const [clientPlots, clientPlot, handleClientPlot] = useUnit([
		model.$clientPlots,
		model.$clientPlot,
		model.clientPlotSettled,
	])

	React.useEffect(() => {
		if (fitBounds) {
			model.fitBoundsClientPlotsFx()
		}
	})

	return (
		<>
			{clientPlots.map((clientPlot, index) => (
				<React.Fragment key={index}>{renderPlots({ item: clientPlot, onClick: handleClientPlot })}</React.Fragment>
			))}
			{clientPlot && renderPlot({ data: clientPlot, onClick: handleClientPlot })}
		</>
	)
}
