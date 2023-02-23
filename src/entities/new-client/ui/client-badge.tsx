import { Badge } from '@chakra-ui/react'

interface ClientBadgeProps {
	hasGuid: boolean
}

export function ClientBadge(props: ClientBadgeProps) {
	const { hasGuid } = props

	return <>{hasGuid ? <Badge>Постоянный</Badge> : <Badge>Новый</Badge>}</>
}
