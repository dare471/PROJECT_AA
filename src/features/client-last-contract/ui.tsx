import { useUnit } from 'effector-react'

import { ClientContractCard, type createClientLastContract } from '~src/entities/new-client'

interface ClientLastContractProps {
	model: ReturnType<typeof createClientLastContract>
}

export function ClientLastContract(props: ClientLastContractProps) {
	const { model } = props
	const [clientLastContract, clientLastContractStatus] = useUnit([
		model.$clientLastContract,
		model.$clientLastContractStatus,
	])

	return (
		<>
			{clientLastContract && (
				<ClientContractCard
					status={clientLastContractStatus}
					name={clientLastContract.name}
					number={clientLastContract.number}
					contractStatus={clientLastContract.status}
					season={clientLastContract.season}
					dateStart={clientLastContract.dateStart}
					dateEnd={clientLastContract.dateEnd}
					manager={clientLastContract.manager}
					sum={clientLastContract.sum}
					deliveryAddress={clientLastContract.deliveryAddress}
					id={clientLastContract.id}
				/>
			)}
		</>
	)
}
