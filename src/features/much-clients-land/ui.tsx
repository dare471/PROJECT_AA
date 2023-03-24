import { useUnit } from 'effector-react'

import { ClientCard } from '~src/entities/new-client'

import { Empty, Spin } from '~src/shared/ui'

import { type createMuchClientsLand } from './model'

interface MuchClientsLandProps {
	model: ReturnType<typeof createMuchClientsLand>
}

export function MuchClientsLand(props: MuchClientsLandProps) {
	const { model } = props
	const [clientsLand, clientsLandPending] = useUnit([model.$clientsLand, model.$clientsLandPending])

	if (clientsLandPending) {
		return <Spin />
	}

	if (clientsLand.length === 0) {
		return <Empty>Нету данных</Empty>
	}

	return (
		<>
			{clientsLand.map((clientLand, index) => (
				<ClientCard key={index} {...clientLand} />
			))}
		</>
	)
}
