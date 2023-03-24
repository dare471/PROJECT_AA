import { Button, Stack, type StackProps } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { MdAgriculture } from 'react-icons/md'

import { CulturesFactory } from '~src/entities/culture'

import * as model from './model'

type LegendProps = StackProps

export function Legend(props: LegendProps) {
	const [legendIsOpen, region, handleLegendToggle] = useUnit([
		model.$isCulturesLegendOpen,
		model.$$regionsToRegion.$land,
		model.culturesLegendToggled,
	])

	return (
		<>
			{legendIsOpen && (
				<Stack
					position='absolute'
					bottom='16'
					right='2'
					maxH='96'
					maxW='80'
					zIndex='sticky'
					bgColor='blue.500'
					px='2'
					py='4'
					rounded='md'
					{...props}
				>
					<CulturesFactory.Cultures model={model.$$cultures} overflow='auto' />
				</Stack>
			)}
			<Button
				colorScheme='blue'
				isActive={legendIsOpen}
				isDisabled={!region}
				onClick={() => handleLegendToggle()}
				w='32'
				position='absolute'
				bottom='2'
				right='2'
				zIndex='sticky'
			>
				<MdAgriculture />
			</Button>
		</>
	)
}
