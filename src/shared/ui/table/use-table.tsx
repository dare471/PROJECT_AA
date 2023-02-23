import React from 'react'

export interface Column<T = {}, K = {}> {
	header: (params: { data: T[]; item: T; rowIndex: number; columnIndex: number; tableState: K }) => React.ReactNode
	cell: (params: { data: T[]; item: T; rowIndex: number; columnIndex: number; tableState: K }) => React.ReactNode
}

interface UseTableProps<T, K> {
	data: T[]
	columns: Column<T, K>[]
	tableState: K
}

export function useTable<T, K>(props: UseTableProps<T, K>) {
	const { data, columns, tableState } = props

	const getHeaders = React.useCallback(() => {
		return columns.map((column, columnIndex) => {
			return column.header({ data, item: data[0]!, rowIndex: 0, columnIndex, tableState })
		})
	}, [data, columns, tableState])

	const getCells = React.useCallback(() => {
		return data.map((item, rowIndex) => {
			return columns.map((column, columnIndex) => {
				return (
					<React.Fragment key={columnIndex}>
						{column.cell({ data, item, rowIndex, columnIndex, tableState })}
					</React.Fragment>
				)
			})
		})
	}, [data, columns, tableState])

	return { getHeaders, getCells }
}
