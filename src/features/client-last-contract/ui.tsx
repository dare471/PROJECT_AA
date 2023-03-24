import { useUnit } from 'effector-react'

import { ClientContractCard, type createClientLastContract } from '~src/entities/new-client'

import { Empty, Spin } from '~src/shared/ui'

interface ClientLastContractProps {
	model: ReturnType<typeof createClientLastContract>
}

export function ClientLastContract(props: ClientLastContractProps) {
	const { model } = props
	const [clientLastContract, clientLastContractPending] = useUnit([
		model.$clientLastContract,
		model.$clientLastContractPending,
	])

	if (clientLastContractPending) {
		return <Spin />
	}

	if (clientLastContract === null) {
		return <Empty>Нету данных</Empty>
	}

	return <>{clientLastContract && <ClientContractCard {...clientLastContract} />}</>
}
