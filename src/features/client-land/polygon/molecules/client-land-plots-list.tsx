import { modelView } from 'effector-factorio'
import { useStore, useUnit } from 'effector-react'
import { Fragment } from 'react'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { Text } from '~src/shared/ui'

import { clientLandFactory } from '../model'

export const ClientLandPlotsList = modelView(clientLandFactory, ({ model }) => {
	const [clientLandPlots, handleClick] = useUnit([
		model.$clientLandPlots,
		model.clientLandPlotClicked
	])
	const currentClientLandPlotId = useStore(model.$clientLandPlotId)

	if (!clientLandPlots) return null

	return (
		<Container>
			<Header>
				<Text type='h6'>Наименование: {clientLandPlots[0].clientName}</Text>
				<Text type='span'>Деятельность: {clientLandPlots[0].clientAction}</Text>
				<Text type='span'>Адресс: {clientLandPlots[0].clientAddress}</Text>
				<Text type='span'>ИИН: {clientLandPlots[0].clientBin}</Text>
			</Header>
			<List>
				{clientLandPlots.map((clientLandPlot) => (
					<Fragment key={clientLandPlot.clientId}>
						{clientLandPlot.linkPlot.map((plot) => (
							<Item
								key={plot.plotId}
								data-active={plot.plotId === currentClientLandPlotId}
								onClick={() => handleClick({ id: plot.plotId })}
							>
								<Text type='span'>Названия участка: {plot.plotName}</Text>
								<Text type='span'>Культура участка: {plot.plotCultName}</Text>
								<Text type='span'>Площадь участка: {plot.plotArea}</Text>
							</Item>
						))}
					</Fragment>
				))}
			</List>
		</Container>
	)
})

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;

	padding: 0.1rem 0.5rem;
`

const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	background-color: var(${theme.palette.primary600});
	border-radius: ${theme.spacing(1)};
	padding: 0.5rem 1rem;
	color: var(${theme.palette.bnw950});

	position: sticky;
	top: 0;
	left: 0;
`

const List = styled.ul`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	flex: 1 0 auto;
	min-height: 0;
	width: 100%;
	height: 100%;

	padding: 0;
	padding-right: 0.5rem;
	margin: 0;
	overflow-y: auto;
`

const Item = styled.li<{ 'data-active': boolean }>`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: var(${theme.palette.bnw950});
	border: 1px solid var(${theme.palette.primary600});
	border-radius: ${theme.spacing(1)};
	padding: 0.5rem 1rem;

	font-size: 1rem;
	color: var(${theme.palette.primary500});

	cursor: pointer;

	&[data-active='true'] {
		background-color: var(${theme.palette.primary600});
		color: var(${theme.palette.bnw950});
	}
`
