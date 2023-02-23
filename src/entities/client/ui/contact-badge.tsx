import { Badge, type BadgeProps } from '@chakra-ui/react'

interface ContactBadgeProps extends BadgeProps {
	active: boolean
}

export function ContactBadge(props: ContactBadgeProps) {
	const { active } = props

	if (active) {
		return <Badge colorScheme='green'>Действительный</Badge>
	} else {
		return <Badge colorScheme='red'>Не действительный</Badge>
	}
}
