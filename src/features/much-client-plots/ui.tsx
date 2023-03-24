import { useUnit } from 'effector-react'

import { ClientPlotCard, type createClientPlots } from '~src/entities/new-client'

import { Empty } from '~src/shared/ui'
import { Spin } from '~src/shared/ui'

interface MuchClientPlotsProps {
	model: ReturnType<typeof createClientPlots>
	onClick: (args: { event: any; clientId: number; plotCultId: number | undefined; plotId: number }) => void
	plotId?: number | null
}

export function MuchClientPlots(props: MuchClientPlotsProps) {
	const { model, onClick, plotId } = props
	const [clientPlots, clientPlotsPending] = useUnit([model.$clientPlots, model.$clientPlotsPending])

	if (clientPlotsPending) {
		return <Spin />
	}

	if (clientPlots.length === 0) {
		return <Empty>Нет клиентов</Empty>
	}

	return (
		<>
			{clientPlots.map((clientPlot, index) => (
				<ClientPlotCard
					key={index}
					onClick={onClick}
					bgColor={clientPlot.plotId === plotId ? 'blue.500' : 'unset'}
					{...clientPlot}
				/>
			))}
		</>
	)
}
