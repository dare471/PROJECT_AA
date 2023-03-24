import { Checkbox, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { type ClientPlot } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

import { type createClientsSelect } from '../model'

interface ClientSelectCardProps<T extends Pick<ClientPlot, 'clientId'>> {
	model: ReturnType<typeof createClientsSelect<T>>
}

export function AllClientsSelect<T extends Pick<ClientPlot, 'clientId'>>(props: ClientSelectCardProps<T>) {
	const { model } = props
	const [clients, selectClientsIds, handleSelectAll] = useUnit([
		model.$clients,
		model.$selectClientIds,
		model.allClientsSelected,
	])

	return (
		<>
			<Checkbox
				colorScheme='whiteAlpha'
				isChecked={clients.length === selectClientsIds.length}
				onChange={(event) => handleSelectAll(event.target.checked)}
			/>
			<Stack direction='row' align='center'>
				<Text color='whitesmoke'>Выбрано клиентов:</Text>
				<Text color='whitesmoke' fontSize='md'>
					{selectClientsIds.length}
				</Text>
			</Stack>
		</>
	)
}
