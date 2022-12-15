import { DataGrid } from '@mui/x-data-grid'
import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { CreateModal } from '~src/shared/ui'

import { yieldStructuresAnalyticModalFactory } from '../model'

export const YieldStructuresAnalyticModal = modelView(
	yieldStructuresAnalyticModalFactory,
	({ model }) => {
		const [rows, pending] = useUnit([
			model.$yieldStructureRows,
			model.$yieldStructuresAnalyticsPending
		])

		return (
			<CreateModal.Modal model={model.modalModel}>
				<Container>
					<Table loading={pending} rowCount={rows.length} columns={columns} rows={rows} />
				</Container>
			</CreateModal.Modal>
		)
	}
)

const columns = [
	{
		field: 'culture',
		headerName: 'Култура',
		width: 250
	},
	{
		field: 'season',
		headerName: 'Сезон',
		width: 250
	},
	{
		field: 'clientIinbin',
		headerName: 'Иин',
		width: 250
	},
	{
		field: 'cropCapacity',
		headerName: 'Обьем',
		width: 250
	}
]

const Container = styled.div`
	height: 80vh;
	width: 80vw;
`

const Table = styled(DataGrid)`
	width: 100%;
	height: 100%;
`
