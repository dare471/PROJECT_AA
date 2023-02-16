import { createEvent, createStore, sample, type Store } from 'effector'

export type TableState = {
	rowSelect: Record<number, boolean>
	rowExtend: Record<number, boolean>
}

export interface CreateTableOptions<T, K> {
	data: Store<T>
	tableGenerateCb: (data: T) => K
	tableState?: Store<K>
	defaultState?: K
	isSelect?: boolean
	isExtend?: boolean
}

export function createTable<T, K extends Record<string, any> = TableState>(options: CreateTableOptions<T, K>) {
	const { data, tableState, tableGenerateCb, defaultState, isSelect = false, isExtend = false } = options

	const currentRowSettled = createEvent<number>()

	const rowSelected = createRowEvent<{ rowIndex: number }>()
	const allRowSelected = createEvent<{ value: boolean }>()

	const rowExtended = createRowEvent<{ rowIndex: number }>()
	const allRowExtended = createEvent<{ value: boolean }>()

	const tableReset = createEvent<void>()

	const $defaultTableState = createStore<K>(defaultState ? defaultState : ({} as K))
	const $tableState = tableState ? tableState : $defaultTableState

	const $currentRow = createStore<number | null>(null)

	$tableState.on(data, (state, data) => tableGenerateCb(data))
	$currentRow.on(currentRowSettled, (state, rowIndex) => rowIndex)

	if (isSelect) {
		$tableState.on(rowSelected, (state, { rowIndex }) => ({
			...state,
			rowSelect: {
				...state.rowSelect,
				[rowIndex]: state.rowSelect[rowIndex] ? !state.rowSelect[rowIndex] : true,
			},
		}))

		$tableState.on(allRowSelected, (state, { value }) => ({
			...state,
			rowSelect: Object.keys(state.rowSelect).reduce((acc, key) => {
				acc[key] = value
				return acc
			}, {} as Record<number, boolean>),
		}))
	}

	if (isExtend) {
		$tableState.on(rowExtended, (state, { rowIndex }) => ({
			...state,
			rowExtend: {
				...state.rowExtend,
				[rowIndex]: !state.rowExtend[rowIndex],
			},
		}))

		$tableState.on(allRowExtended, (state, { value }) => ({
			...state,
			rowExtend: Object.keys(state.rowExtend).reduce((acc, key) => {
				acc[key] = value
				return acc
			}, {} as Record<number, boolean>),
		}))
	}

	sample({
		clock: tableReset,
		source: data,
		fn: (data) => tableGenerateCb(data),
		target: $tableState,
	})

	function createRowEvent<T extends { rowIndex: number }>() {
		const rowEvent = createEvent<T>()
		sample({
			clock: rowEvent,
			fn: ({ rowIndex }) => rowIndex,
			target: currentRowSettled,
		})
		return rowEvent
	}

	return {
		createRowEvent,
		currentRowSettled,
		rowSelected,
		allRowSelected,
		rowExtended,
		allRowExtended,
		tableReset,
		$tableState,
		$currentRow,
	}
}
