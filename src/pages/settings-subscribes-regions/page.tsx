import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'

import { Spin } from '~src/shared/ui'

import * as model from './model'

export function SettingsSubscribesRegionsPage() {
	const [handleMount, handleUnmount] = useUnit([
		model.settingsSubscribesRegionsPageMounted,
		model.settingsSubscribesRegionsPageUnmounted,
	])

	React.useEffect(() => {
		handleMount()
		return () => handleUnmount()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Stack>
			<Stack minH='md' shadow='md' px='6' py='4'>
				<Text fontSize='2xl' fontWeight='bold' mb='2'>
					Подписанные регионы
				</Text>
				<SubscribesRegions />
			</Stack>
			<Stack minH='md' shadow='md' px='6' py='4'>
				<Text fontSize='2xl' fontWeight='bold' mb='2'>
					Отписанные регионы
				</Text>
				<UnSubscribesRegions />
			</Stack>
		</Stack>
	)
}

function SubscribesRegions() {
	const [subscribesRegions, subscribesRegionsPending] = useUnit([
		model.$$userSubscribesRegions.$userRegions,
		model.$$userSubscribesRegions.$userRegionsPending,
	])
	const [handleUnSubscribe] = useUnit([model.regionsUnSubscribed])

	if (subscribesRegionsPending) {
		return <Spin />
	}

	return (
		<>
			{subscribesRegions.map((subscribesRegion, index) => (
				<Card key={index} variant='filled'>
					<CardBody>
						<Stack direction='row' justify='space-between' align='center'>
							<Text fontSize='md' fontWeight='bold'>
								{subscribesRegion.name}
							</Text>
							<Button colorScheme='red' onClick={() => handleUnSubscribe(subscribesRegion.regionId)}>
								<DeleteIcon />
							</Button>
						</Stack>
					</CardBody>
				</Card>
			))}
		</>
	)
}

function UnSubscribesRegions() {
	const [unSubscribesRegions, unSubscribesRegionsPending] = useUnit([
		model.$$userUnSubscribesRegions.$userRegions,
		model.$$userUnSubscribesRegions.$userRegionsPending,
	])
	const [handleSubscribe] = useUnit([model.regionsSubscribed])

	if (unSubscribesRegionsPending) {
		return <Spin />
	}

	return (
		<>
			{unSubscribesRegions.map((unSubscribesRegion, index) => (
				<Card key={index} variant='filled'>
					<CardBody>
						<Stack direction='row' justify='space-between' align='center'>
							<Text fontSize='md' fontWeight='bold'>
								{unSubscribesRegion.name}
							</Text>
							<Button colorScheme='blue' onClick={() => handleSubscribe(unSubscribesRegion.regionId)}>
								<AddIcon />
							</Button>
						</Stack>
					</CardBody>
				</Card>
			))}
		</>
	)
}
