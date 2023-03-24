import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'

import { DescriptionText, Pagination, Spin, usePagination } from '~src/shared/ui'

import * as model from './model'

export function SettingsSubscribesClientsPage() {
	const [handleMount, handleUnmount] = useUnit([
		model.settingsSubscribesClientsPageMounted,
		model.settingsSubscribesClientsPageUnmounted,
	])

	React.useEffect(() => {
		handleMount()
		return () => handleUnmount()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Stack>
			<Stack minH='md' shadow='md' px='6' py='4'>
				<Text fontSize='2xl' fontWeight='bold'>
					Подписанные клиенты
				</Text>
				<SubscribesClients />
			</Stack>
			<Stack minH='md' shadow='md' px='6' py='4'>
				<Text fontSize='2xl' fontWeight='bold'>
					Отписанные клиенты
				</Text>
				<UnSubscribesClients />
			</Stack>
		</Stack>
	)
}

function SubscribesClients() {
	const [subscribesClients, subscribesClientsPending] = useUnit([
		model.$$userSubscribesClients.$userClients,
		model.$$userSubscribesClients.$userClientsPending,
	])
	const [handleUnSubscribe] = useUnit([model.clientUnSubscribed])
	const { maxPage, pages, currentData, currentPage, setCurrentPage } = usePagination({
		data: subscribesClients,
		perPage: 5,
		maxPages: 5,
	})

	if (subscribesClientsPending) {
		return <Spin />
	}

	return (
		<>
			{currentData.map((subscribesClient, index) => (
				<Card key={index} variant='filled'>
					<CardBody>
						<Stack>
							<Text fontSize='md' fontWeight='bold'>
								{subscribesClient.clientName}
							</Text>
							<DescriptionText title='Деятельность:'>{subscribesClient.clientType}</DescriptionText>
							<DescriptionText title='Адрес:'>{subscribesClient.clientAddress}</DescriptionText>
							<DescriptionText title='Иин/Бин:'>{subscribesClient.clientIinBin}</DescriptionText>
						</Stack>
						<Stack direction='row' justify='end'>
							<Button colorScheme='red' onClick={() => handleUnSubscribe(subscribesClient.clientId)}>
								<DeleteIcon />
							</Button>
						</Stack>
					</CardBody>
				</Card>
			))}

			<Pagination
				pages={pages}
				currentPage={currentPage}
				onFirstClick={() => setCurrentPage(1)}
				onLastClick={() => setCurrentPage(maxPage)}
				onPageChange={(newPage) => setCurrentPage(newPage)}
			/>
		</>
	)
}

function UnSubscribesClients() {
	const [unSubscribesClients, unSubscribesClientsPending] = useUnit([
		model.$$userUnSubscribesClients.$userClients,
		model.$$userUnSubscribesClients.$userClientsPending,
	])
	const [handleSubscribe] = useUnit([model.clientSubscribed])

	const { maxPage, currentData, pages, currentPage, setCurrentPage } = usePagination({
		data: unSubscribesClients,
		perPage: 5,
		maxPages: 5,
	})

	if (unSubscribesClientsPending) {
		return <Spin />
	}

	return (
		<>
			{currentData.map((unSubscribesClient, index) => (
				<Card key={index} variant='filled'>
					<CardBody>
						<Stack>
							<Text fontSize='md' fontWeight='bold'>
								{unSubscribesClient.clientName}
							</Text>
							<DescriptionText title='Деятельность:'>{unSubscribesClient.clientType}</DescriptionText>
							<DescriptionText title='Адрес:'>{unSubscribesClient.clientAddress}</DescriptionText>
							<DescriptionText title='Иин/Бин:'>{unSubscribesClient.clientIinBin}</DescriptionText>
						</Stack>
						<Stack direction='row' justify='end'>
							<Button colorScheme='blue' onClick={() => handleSubscribe(unSubscribesClient.clientId)}>
								<AddIcon />
							</Button>
						</Stack>
					</CardBody>
				</Card>
			))}
			<Pagination
				pages={pages}
				currentPage={currentPage}
				onFirstClick={() => setCurrentPage(1)}
				onLastClick={() => setCurrentPage(maxPage)}
				onPageChange={(newPage) => setCurrentPage(newPage)}
			/>
		</>
	)
}
