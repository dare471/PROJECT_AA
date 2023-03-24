import { ChevronLeftIcon, ChevronRightIcon, DragHandleIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Stack, StackItem } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { motion, useDragControls } from 'framer-motion'
import React from 'react'
import { MdCalendarViewMonth, MdOutlineViewAgenda } from 'react-icons/md'

import { ClientSearchFactory } from '~src/features/client-search'
import { CulturesSelectFactory } from '~src/features/cultures-select'
import { RegionSelectFactory } from '~src/features/region-select'

import * as model from './model'
import { cultureColors } from './lib'

export function MapToolbar() {
	const [isToolbarOpen, handleToolbarClick] = useUnit([model.$isToolbarOpen, model.toolbarToggled])
	const controls = useDragControls()
	const containersRef = React.useRef(null)

	return (
		<>
			<Box position='absolute' top='0' right='4' width='calc(100% - 600px)' height='full' ref={containersRef} />
			<Box
				as={motion.div}
				drag
				dragConstraints={containersRef}
				position='absolute'
				top='10px'
				right='10px'
				zIndex='dropdown'
			>
				<Stack position='relative' maxH='12' direction='row' align='center' bgColor='blue.500' rounded='md' p='2'>
					<Button
						as={motion.div}
						{...controls}
						bgColor='transparent'
						_hover={{ bgColor: 'transparent' }}
						_active={{ bgColor: 'transparent' }}
					>
						<Icon as={DragHandleIcon} aria-label='drag' cursor='pointer' color='white' />
					</Button>

					{isToolbarOpen && (
						<>
							<StackItem>
								<RegionSelectFactory.RegionSelect
									model={model.$$regionSelect}
									styles={{
										container: (styles) => ({
											...styles,
											minWidth: '15rem',
											maxWidth: '25rem',
										}),
										valueContainer: (base) => ({
											...base,
											overflowX: 'scroll',
											flexWrap: 'unset',
										}),
										multiValue: (base) => ({
											...base,
											flex: '1 0 auto',
										}),
									}}
								/>
							</StackItem>
							<StackItem>
								<CulturesSelectFactory.CulturesSelect
									model={model.$$culturesSelect}
									styles={{
										container: (styles) => ({
											...styles,
											minWidth: '15rem',
											maxWidth: '25rem',
										}),
										valueContainer: (base) => ({
											...base,
											overflowX: 'scroll',
											flexWrap: 'unset',
										}),
										multiValue: (base) => ({
											...base,
											flex: '1 0 auto',
										}),
										multiValueLabel: (styles, { data }) => {
											const bgColor = cultureColors[(data as any).value].bgColor ?? 'red'

											return {
												...styles,
												paddingLeft: '1.5rem',
												paddingTop: '.1rem',
												paddingBottom: '.1rem',
												position: 'relative',
												':before': {
													content: '""',
													width: '1rem',
													height: '1rem',
													backgroundColor: bgColor,
													borderRadius: '50%',
													position: 'absolute',
													top: '50%',
													left: '.3rem',
													transform: 'translateY(-50%)',
												},
											}
										},
									}}
								/>
							</StackItem>
							<StackItem>
								<ClientSearchFactory.ClientSearch model={model.$$clientSearch} />
							</StackItem>
							<StackItem>
								<ClientSeparateButton />
							</StackItem>
							<StackItem>
								<ShowAfterRegionButton />
							</StackItem>
						</>
					)}
					<Button isActive={isToolbarOpen} colorScheme='blue' onClick={() => handleToolbarClick()}>
						{isToolbarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</Button>
				</Stack>
			</Box>
		</>
	)
}

function ClientSeparateButton() {
	const [isSeparate, clientsLand, handleSeparateToggle] = useUnit([
		model.$isClientsSeparate,
		model.$$clientsLand.$clientsLand,
		model.clientsSeparateToggled,
	])

	return (
		<Button
			colorScheme='blue'
			borderWidth='1px'
			borderColor='white'
			isActive={isSeparate}
			isDisabled={clientsLand.length === 0}
			onClick={() => handleSeparateToggle()}
		>
			<Icon as={MdOutlineViewAgenda} color='white' />
		</Button>
	)
}

function ShowAfterRegionButton() {
	const [showAfterRegion, handleShowAfterRegionToggle] = useUnit([model.$showAfterRegion, model.showAfterRegionToggled])

	return (
		<Button
			colorScheme='blue'
			borderWidth='1px'
			borderColor='white'
			isActive={showAfterRegion === 'districts'}
			onClick={() => handleShowAfterRegionToggle()}
		>
			<Icon as={MdCalendarViewMonth} color='white' />
		</Button>
	)
}
