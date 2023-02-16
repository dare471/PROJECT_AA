import { createEvent, createStore, sample, type Store } from 'effector'

export interface TableState {
	rowSelected: Record<number, boolean>
	rowExtended: Record<number, boolean>
}

// TODO: If It's will need add events option for other events with row or other tools
export type CreateTableOptions<T, K> = {
	data: Store<K[]>
	defaultState?: T
	isSelected?: boolean
	isExtended?: boolean
}

export function createTable<K, T extends TableState>(options: CreateTableOptions<T, K>) {
	const {
		data,
		defaultState = { rowSelected: {}, rowExtended: {} } as T,
		isExtended = false,
		isSelected = false,
	} = options

	const tableSettled = createEvent<T>()
	const tableReset = createEvent<void>()
	const currentRowSettled = createEvent<{ rowIndex: number }>()

	const allRowSelected = createEvent<boolean>()
	const rowSelected = createEvent<{ rowIndex: number; value: boolean }>()
	const rowExtended = createEvent<{ rowIndex: number }>()

	const $table = createStore<T>(defaultState)
	const $currentRow = createStore<number | null>(null)

	if (isSelected) {
		sample({
			clock: allRowSelected,
			source: { table: $table, data },
			fn: ({ table, data }, allSelected) => ({
				...table,
				rowSelected: data.reduce((acc, _, rowIndex) => {
					acc[rowIndex] = allSelected
					return acc
				}, {} as Record<number, boolean>),
			}),
			target: tableSettled,
		})

		sample({
			clock: rowSelected,
			source: { table: $table, data },
			fn: ({ table }, { rowIndex, value }) => ({
				...table,
				rowSelected: {
					...table.rowSelected,
					[rowIndex]: value,
				},
			}),
			target: tableSettled,
		})

		sample({
			clock: rowSelected,
			target: currentRowSettled,
		})
	}
	if (isExtended) {
		sample({
			clock: rowExtended,
			source: { table: $table, data },
			fn: ({ table }, { rowIndex }) => ({
				...table,
				rowExtended: {
					...table.rowExtended,
					[rowIndex]: table.rowExtended[rowIndex] ? !table.rowExtended[rowIndex] : true,
				},
			}),
			target: tableSettled,
		})

		sample({
			clock: rowExtended,
			target: currentRowSettled,
		})
	}

	$table.on(tableSettled, (_, table) => table)
	$currentRow.on(currentRowSettled, (_, { rowIndex }) => rowIndex)

	$table.reset(tableReset)

	return {
		tableSettled,
		tableReset,
		currentRowSettled,
		allRowSelected,
		rowSelected,
		rowExtended,
		$table,
		$currentRow,
	}
}
