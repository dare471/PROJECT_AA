import { useUnit } from 'effector-react'
import React from 'react'

import { type UserContract } from '~src/shared/api'
import { type Column, TableFactory, useTable } from '~src/shared/ui'

import * as model from './model'

export function SettingsContractsPage() {
	const [handleMount, handleUnmount] = useUnit([
		model.settingsContractsPageMounted,
		model.settingsContractsPageUnmounted,
	])

	React.useEffect(() => {
		handleMount()
		return () => {
			handleUnmount()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<UserContractsTable />
		</>
	)
}

function UserContractsTable() {
	const [userContracts, userContractsPending] = useUnit([
		model.$$userContracts.$userContracts,
		model.$$userContracts.$userContractsPending,
	])
	const [tableState] = useUnit([model.$$userContractsTable.$tableState])

	const columns = React.useMemo<Column<UserContract>[]>(
		() => [
			{
				header: () => '',
				cell: () => '',
			},
		],
		[],
	)

	const { getHeaders, getCells } = useTable({
		data: userContracts,
		columns,
		tableState,
	})

	return (
		<TableFactory.TableContainer
			borderColor='lightgray'
			borderWidth='1px'
			borderRadius='md'
			boxShadow='md'
			overflow='auto'
			whiteSpace='pre-wrap'
			w='full'
			h='fit-content'
		>
			<TableFactory.Table
				sx={{ borderCollapse: 'collapse' }}
				overflow='hidden'
				position='relative'
				borderStyle='hidden'
			>
				<TableFactory.THead>
					<TableFactory.Tr>
						{getHeaders().map((header, index) => (
							<TableFactory.Th key={index}>{header}</TableFactory.Th>
						))}
					</TableFactory.Tr>
				</TableFactory.THead>
				<TableFactory.TBody
					columnLength={columns.length}
					empty={{ empty: userContracts.length === 0 }}
					loading={{ loading: userContractsPending }}
				>
					{getCells().map((cell, index) => (
						<TableFactory.Tr key={index}>{cell}</TableFactory.Tr>
					))}
				</TableFactory.TBody>
			</TableFactory.Table>
		</TableFactory.TableContainer>
	)
}
