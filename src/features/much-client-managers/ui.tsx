import { useUnit } from 'effector-react'

import { ClientManagerCard, type createClientManagers } from '~src/entities/new-client'

import { ErrorMessage, Spin } from '~src/shared/ui'

interface ClientManagersProps {
	model: ReturnType<typeof createClientManagers>
}

export function ClientManagers(props: ClientManagersProps) {
	const { model } = props
	const [clientManagers, clientManagersStatus] = useUnit([model.$clientManagers, model.$clientManagersStatus])

	if (clientManagersStatus === 'pending') {
		return <Spin />
	}

	if (clientManagersStatus === 'fail') {
		return <ErrorMessage>Произошла ошибка</ErrorMessage>
	}

	return (
		<>
			{clientManagers.map((clientManager, index) => (
				<ClientManagerCard key={index} {...clientManager} />
			))}
		</>
	)
}
