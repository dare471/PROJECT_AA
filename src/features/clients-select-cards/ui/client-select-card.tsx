import { Button, Checkbox, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'

import { ClientCard } from '~src/entities/new-client'

import { type ClientPlot } from '~src/shared/api'

import { type createClientsSelect } from '../model'

interface ClientSelectCardProps<T extends Pick<ClientPlot, 'clientId'>> {
	model: ReturnType<typeof createClientsSelect<T>>
	favoriteClientIds: number[]
	onSeeClick?: ({ clientId }) => void
}

export function ClientSelectCard<T extends Pick<ClientPlot, 'clientId'>>(props: ClientSelectCardProps<T>) {
	const { model, favoriteClientIds, onSeeClick } = props
	const [clients] = useUnit([model.$clients])
	const [selectClientIds, handleSelect] = useUnit([model.$selectClientIds, model.clientSelected])

	return (
		<>
			{clients.map((client, index) => (
				<React.Fragment key={index}>
					<ClientCard
						header={
							<Stack direction='row' justify='space-between'>
								<Text fontSize='md' fontWeight='bold'>
									Выбрать:
								</Text>
								<Checkbox
									colorScheme='blue'
									isChecked={selectClientIds.includes(client.clientId) || favoriteClientIds.includes(client.clientId)}
									isDisabled={favoriteClientIds.includes(client.clientId)}
									onChange={() => handleSelect(client.clientId)}
								/>
							</Stack>
						}
						footer={
							<Button
								w='full'
								colorScheme='blue'
								onClick={() => (onSeeClick ? onSeeClick({ clientId: client.clientId }) : null)}
							>
								Увидеть на карте
							</Button>
						}
						{...client}
					/>
				</React.Fragment>
			))}
		</>
	)
}
