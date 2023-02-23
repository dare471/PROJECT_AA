import { useUnit } from 'effector-react'

import { ClientPlotCard, type createClientPlots } from '~src/entities/new-client'

import { ErrorMessage, Spin } from '~src/shared/ui'

interface MuchClientPlotsProps {
	model: ReturnType<typeof createClientPlots>
}

export function MuchClientPlots(props: MuchClientPlotsProps) {
	const { model } = props
	const [clientPlots, clientPlotsStatus] = useUnit([model.$clientPlots, model.$clientPlotsStatus])

	if (clientPlotsStatus === 'pending') {
		return <Spin />
	}

	if (clientPlotsStatus === 'fail') {
		return <ErrorMessage>Произошла ошибка</ErrorMessage>
	}

	return (
		<>
			{clientPlots.map((clientPlot, index) => (
				<ClientPlotCard key={index} {...clientPlot} />
			))}
		</>
	)
}
