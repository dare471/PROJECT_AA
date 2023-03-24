import { useUnit } from 'effector-react'

import { ClientManagerCard, type createClientManagers } from '~src/entities/new-client'

import { Empty, Spin } from '~src/shared/ui'

interface ClientManagersProps {
	model: ReturnType<typeof createClientManagers>
}

export function ClientManagers(props: ClientManagersProps) {
	const { model } = props
	const [clientManagers, clientManagersPending] = useUnit([model.$clientManagers, model.$clientManagersPending])

	if (clientManagersPending) {
		return <Spin />
	}

	if (!clientManagers.length) {
		return <Empty>Нет менеджеров</Empty>
	}

	return (
		<>
			{clientManagers.map((clientManager, index) => (
				<ClientManagerCard key={index} {...clientManager} />
			))}
		</>
	)
}
