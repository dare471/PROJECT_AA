import { Stack } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'

import { UserMapHistoryCard } from '~src/entities/user'
import { UserCard } from '~src/entities/user/ui'

import { Pagination, Spin, usePagination } from '~src/shared/ui'

import * as model from './model'

export function SettingsProfilePage() {
	const [handleMount, handleUnmount] = useUnit([model.$settingsProfilePageMounted, model.$settingsProfilePageUnmounted])

	React.useEffect(() => {
		handleMount()

		return () => {
			handleUnmount()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Stack>
			<Stack minH='2xs' bgColor='whiteAlpha.300' rounded='md' boxShadow='md' px='4' py='5'>
				<User />
			</Stack>
			<Stack minH='md' bgColor='whiteAlpha.300' rounded='md' boxShadow='md' px='4' py='5'>
				<UserMapHistories />
			</Stack>
		</Stack>
	)
}

function UserMapHistories() {
	const [userMapHistories, userMapHistoriesPending] = useUnit([
		model.$$userMapHistories.$userMapHistories,
		model.$$userMapHistories.$userMapHistoriesPending,
	])
	const { maxPage, pages, currentData, currentPage, setCurrentPage } = usePagination({
		data: userMapHistories,
		perPage: 5,
		maxPages: 5,
	})

	if (userMapHistoriesPending) {
		return <Spin />
	}

	return (
		<Stack>
			{currentData.map((userMapHistory, index) => (
				<UserMapHistoryCard key={index} index={index} {...userMapHistory} />
			))}
			<Pagination
				pages={pages}
				currentPage={currentPage}
				onFirstClick={() => setCurrentPage(1)}
				onLastClick={() => setCurrentPage(maxPage)}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</Stack>
	)
}

function User() {
	const [user, userPending] = useUnit([model.$$user.$user, model.$$user.$userPending])

	if (userPending) {
		return <Spin />
	}

	return (
		<>
			<UserCard orientation='horizontal' {...user} />
		</>
	)
}
