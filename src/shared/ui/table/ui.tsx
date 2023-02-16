import { Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead as THead, Tr } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'

export { Table, TableContainer, Th, THead, Tr, Td }

export interface Column<T> {
	title: React.ReactNode
	dataIndex: keyof T
}

export function TBody(props: {
	children: React.ReactNode

	loading?: {
		icon?: React.ReactNode
		loading: boolean
	}
	columnLength: number
	empty?: {
		empty: boolean
		icon?: React.ReactNode
		content?: string
	}
}) {
	return (
		<StyledTBody data-empty={typeof props.empty === 'object' ? props.empty.empty : false}>
			{typeof props.loading === 'object' && props.loading.loading && (
				<Tr>
					<TableCenter colSpan={props.columnLength}>
						{props.loading.icon ?? (
							<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
						)}
					</TableCenter>
				</Tr>
			)}
			{typeof props.empty === 'object' && props.empty.empty && (!props.loading || !props.loading.loading) && (
				<Tr>
					<TableCenter position='absolute' top='50%' left='50%' p='10'>
						{props.empty.icon ?? props.empty.content ?? (
							<Flex justify='center' alignItems='center' gap='2'>
								<MdOutlineRemoveShoppingCart fontSize={30} />
								<Text>Пусто</Text>
							</Flex>
						)}
					</TableCenter>
				</Tr>
			)}
			{props.children}
		</StyledTBody>
	)
}

const StyledTBody = styled(Tbody)<{ 'data-empty': boolean }>`
	height: ${(p) => (p['data-empty'] ? '50vh' : 'auto')};

	border-radius: var(--border-radius);
`

const TableCenter = styled(Td)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	padding: 10px;
`
