import { Stack, type StackProps, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { cultureColors } from '~src/pages/map/lib'

import { type createCultures } from '../model'

interface CulturesProps extends StackProps {
	model: ReturnType<typeof createCultures>
}

export function Cultures(props: CulturesProps) {
	const { model, ...otherProps } = props
	const [cultures] = useUnit([model.$cultures])

	return (
		<Stack {...otherProps}>
			{cultures.map((culture, index) => (
				<Stack
					position='relative'
					key={index}
					p='2'
					paddingLeft='14'
					bgColor='whiteAlpha.500'
					rounded='md'
					_after={{
						content: '""',
						display: 'block',
						w: '8',
						h: '4',
						bgColor: cultureColors[culture.cultureId].bgColor,
						position: 'absolute',
						top: '50%',
						left: '1rem',
						transform: 'translateY(-50%)',
						rounded: 'md',
					}}
				>
					<Text color='white'>{culture.cultureName}</Text>
				</Stack>
			))}
		</Stack>
	)
}
