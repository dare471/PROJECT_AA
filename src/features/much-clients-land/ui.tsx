import { useUnit } from 'effector-react'

import { ClientCard } from '~src/entities/new-client'

import { ErrorMessage, Spin } from '~src/shared/ui'

import { type createMuchClientsLand } from './model'

interface MuchClientsLandProps {
	model: ReturnType<typeof createMuchClientsLand>
}

export function MuchClientsLand(props: MuchClientsLandProps) {
	const { model } = props
	const [clientsLand, clientsLandStatus] = useUnit([model.$clientsLand, model.$clientsLandStatus])

	if (clientsLandStatus === 'pending') {
		return <Spin />
	}

	if (clientsLandStatus === 'fail') {
		return <ErrorMessage>Произошла ошибка</ErrorMessage>
	}

	return (
		<>
			{clientsLandStatus === 'done' && (
				<>
					{clientsLand.map((clientLand, index) => (
						<ClientCard key={index} {...clientLand} />
					))}
				</>
			)}
		</>
	)
}
