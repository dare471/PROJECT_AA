import { Card, CardBody, type CardProps, Stack, Text } from '@chakra-ui/react'

import { type ClientPlot } from '~src/shared/api'
import { DescriptionText, Spin } from '~src/shared/ui'

interface ClientPlotCardProps extends Partial<ClientPlot>, Omit<CardProps, 'onClick'> {
	load?: { loading: boolean; loader?: React.ReactNode }
	onClick?: (args: { event: any; clientId: number; plotCultId: number | undefined; plotId: number }) => void
}

export function ClientPlotCard(props: ClientPlotCardProps) {
	const {
		plotId,
		plotName,
		plotArea,
		plotCultId,
		plotCultName,
		clientId,
		clientName,
		clientBin,
		clientAddress,
		clientActivity,
		load,
		onClick,
		...otherProps
	} = props

	function handleClick(event: any) {
		if (onClick && clientId && plotId) {
			onClick({ event, clientId, plotCultId, plotId })
		}
	}

	return (
		<Card onClick={handleClick} {...otherProps}>
			<CardBody>
				<Stack>
					{plotName && (
						<Text fontSize='xl' fontWeight='medium'>
							{plotName}
						</Text>
					)}
					{plotArea && <DescriptionText title='Площадь:'>{plotArea}</DescriptionText>}
					{plotCultName && <DescriptionText title='Культура:'>{plotCultName}</DescriptionText>}
					{clientName && <DescriptionText title='Клиент:'>{clientName}</DescriptionText>}
					{clientBin && <DescriptionText title='Иин/Бин:'>{clientBin}</DescriptionText>}
					{clientAddress && <DescriptionText title='Адрес:'>{clientAddress}</DescriptionText>}
					{clientActivity && <DescriptionText title='Вид деятельности:'>{clientActivity}</DescriptionText>}
				</Stack>
			</CardBody>

			{load && load.loading && <>{load.loader ? <>{load.loader}</> : <Spin />}</>}
		</Card>
	)
}
