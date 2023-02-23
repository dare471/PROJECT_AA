import { Badge, type BadgeProps } from '@chakra-ui/react'

interface ClientBadgeProps extends BadgeProps {
	guid: boolean
}

export function ClientBadge(props: ClientBadgeProps) {
	const { guid } = props

	if (guid) {
		return <Badge colorScheme='green'>Постоянный</Badge>
	} else {
		return <Badge colorScheme='red'>Новый</Badge>
	}
}
