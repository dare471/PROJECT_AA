import { DataGrid } from '@mui/x-data-grid'
import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { CreateModal } from '~src/shared/ui'

import { regionAnalyticModalFactory } from '../model'

export const RegionAnalyticModal = modelView(regionAnalyticModalFactory, ({ model }) => {
	const [rows, pending] = useUnit([model.$regionAnalyticsRows, model.$regionAnalyticsPending])

	return (
		<CreateModal.Modal model={model.modalModel}>
			<Container>
				<Table loading={pending} rowCount={rows.length} columns={columns} rows={rows} />
			</Container>
		</CreateModal.Modal>
	)
})

const columns = [
	{
		field: 'category',
		headerName: 'Категория',
		width: 250
	},
	{
		field: 'season',
		headerName: 'Сезон',
		width: 250
	},
	{
		field: 'count',
		headerName: 'Количество',
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
	},
	{
		field: 'factCount',
		headerName: 'Фактическое Количество',
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
