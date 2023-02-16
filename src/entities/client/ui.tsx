import { StarIcon } from '@chakra-ui/icons'
import { Icon, IconButton } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import type { createClientFavorite } from './model'

interface ClientFavoriteButton<T extends boolean = false> {
	model: ReturnType<typeof createClientFavorite>
	isMulti: T
	clientId: T extends true ? undefined : number
}

export function ClientFavoriteButton<T extends boolean = false>(props: ClientFavoriteButton<T>) {
	const { model, isMulti } = props

	if (isMulti) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [handleClientsFavoriteClick] = useUnit([model.addClientsFavoriteClicked])
		return (
			<IconButton
				aria-label='Добавить клиента в избранное'
				variant='solid'
				colorScheme='yellow'
				size='sm'
				onClick={() => handleClientsFavoriteClick()}
			>
				<Icon as={StarIcon} color='white' />
			</IconButton>
		)
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [handleClientFavoriteClick] = useUnit([model.addClientFavoriteClicked])
		return (
			<IconButton
				aria-label='Добавить клиента в избранное'
				variant='solid'
				colorScheme='yellow'
				size='sm'
				onClick={() => handleClientFavoriteClick(props.clientId!)}
			>
				<Icon as={StarIcon} color='white' />
			</IconButton>
		)
	}
}
