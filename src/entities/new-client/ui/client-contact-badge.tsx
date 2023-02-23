import { Badge } from '@chakra-ui/react'

interface ClientContactBadgeProps {
	isActive: boolean
}

export function ClientContactBadge(props: ClientContactBadgeProps) {
	const { isActive } = props

	return <>{isActive ? <Badge colorScheme='green'>Активный</Badge> : <Badge colorScheme='red'>Неактивный</Badge>}</>
}
