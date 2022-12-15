import { DataGrid } from '@mui/x-data-grid'
import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { CreateModal } from '~src/shared/ui'

import { potentialCulturesAnalyticModalFactory } from '../model'

export const PotentialCulturesAnalyticModal = modelView(
	potentialCulturesAnalyticModalFactory,
	({ model }) => {
		const [rows, pending] = useUnit([
			model.$potentialCulturesAnalyticsRows,
			model.$potentialCulturesAnalyticsPending
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
		headerName: 'Культура',
		width: 250
	},
	{
		field: 'clientIinbin',
		headerName: 'Иин',
		width: 250
	},
	{
		field: 'area',
		headerName: 'Площадь',
		width: 250
	},
	{
		field: 'cash',
		headerName: 'Доход',
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
