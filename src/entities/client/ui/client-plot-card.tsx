import { Card, CardBody, Text } from '@chakra-ui/react'

import { type ClientPlot } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

interface ClientPlotCardProps {
	clientPlot: ClientPlot
	onClick: (args: { plotId: number }) => void
}

export function ClientPlotCard(props: ClientPlotCardProps) {
	const { clientPlot, onClick } = props
	return (
		<Card onClick={() => onClick({ plotId: clientPlot.plotId })}>
			<CardBody>
				<Text fontSize='xl' fontWeight='bold'>
					{clientPlot.plotName}
				</Text>
				<DescriptionText title='Культура поля:'>{clientPlot.plotCultName}</DescriptionText>
				<DescriptionText title='Обьем поля:'>{clientPlot.plotArea}.Га</DescriptionText>
			</CardBody>
		</Card>
	)
}
