import { ChevronLeftIcon, ChevronRightIcon, DragHandleIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Icon, SelectField, Stack, StackItem } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { motion, useDragControls } from 'framer-motion'
import React from 'react'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import { VscSplitHorizontal } from 'react-icons/vsc'
import Select from 'react-select'

import { ClientSearchFactory } from '~src/features/client-search'

import * as model from './model'
import { cultureColors } from './lib'

export function MapToolbar() {
	const [isToolbarOpen, handleToolbarClick] = useUnit([model.$isToolbarOpen, model.toolbarClicked])
	const [regions, handleRegionClick] = useUnit([model.$regions, model.regionSettled])
	const [cultureRefs, cultureRefsPending] = useUnit([model.$cultureRefs, model.$cultureRefsPending])
	const [isDistrictsView, handleIsDistrictsViewClick] = useUnit([model.$isDistrictsView, model.districtsViewedClicked])
	const [isClientsPlotsGuideView, handleIsClientsGuideViewClick] = useUnit([
		model.$isClientsPlotsGuidView,
		model.clientsGuidViewedClicked,
	])
	const controls = useDragControls()
	const containersRef = React.useRef(null)

	return (
		<>
			<Box position='absolute' top='0' right='0' width='calc(100% - 600px)' height='full' ref={containersRef} />
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
								{/* <Select maxW='container.md' options={regions.map(({ name, id }) => ({ label: name, value: id }))} /> */}
								<Select
									onChange={(event) => (event ? handleRegionClick(Number(event.value)) : null)}
									placeholder='Выбрать регион'
									styles={{ container: (styles) => ({ ...styles, maxWidth: '15rem' }) }}
									options={regions.map(({ name, id }) => ({ label: name, value: id }))}
								/>
							</StackItem>
							<StackItem position='sticky' top='15px'>
								<CultureSelect />
							</StackItem>
							<StackItem>
								<ClientSearchFactory.ClientSearch model={model.clientSearchModel} />
							</StackItem>
							<StackItem>
								<Button
									colorScheme='blue'
									borderWidth='1px'
									borderColor='whiteAlpha.800'
									isActive={isDistrictsView}
									onClick={handleIsDistrictsViewClick}
								>
									<Icon aria-label='few' as={TbLayoutBoardSplit} />
								</Button>
							</StackItem>
							<StackItem>
								<Button
									colorScheme='blue'
									borderWidth='1px'
									borderColor='whiteAlpha.800'
									isActive={isClientsPlotsGuideView}
									onClick={handleIsClientsGuideViewClick}
								>
									<Icon aria-label='few' as={VscSplitHorizontal} />
								</Button>
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

export function CultureSelect() {
	const [cultureRefs, cultureRefsPending] = useUnit([model.$cultureRefs, model.$cultureRefsPending])
	const [selectedCulturesOptions, handleSelectedCultures] = useUnit([
		model.$selectedCulturesOptions,
		model.culturesSelected,
	])

	return (
		<Select
			styles={{
				container: (styles) => ({
					...styles,
					minWidth: '15rem',
					maxWidth: '25rem',
				}),
				multiValueLabel: (styles, { data }) => {
					const bgColor = cultureColors[data.value].bgColor ?? 'red'

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
			placeholder='Выбрать културы'
			value={selectedCulturesOptions.map(({ cultureName, cultureId }) => ({
				label: cultureName,
				value: Number(cultureId),
			}))}
			onChange={(values) => handleSelectedCultures(values.map(({ value }) => Number(value)))}
			isDisabled={cultureRefs.length === 0}
			isLoading={cultureRefsPending}
			options={cultureRefs.map(({ cultureName, cultureId }) => ({
				label: cultureName,
				value: Number(cultureId),
			}))}
			isMulti
		/>
	)
}
