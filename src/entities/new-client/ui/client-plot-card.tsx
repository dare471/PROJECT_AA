import { Card, CardBody, Stack, Text } from '@chakra-ui/react'
import { type EffectState } from 'patronum/status'

import { type ClientPlot } from '~src/shared/api'
import { DescriptionText, ErrorMessage, Spin } from '~src/shared/ui'

interface ClientPlotCardProps extends Partial<ClientPlot> {
	status?: EffectState
	loader?: React.ReactNode
	error?: { icon?: React.ReactNode; message?: string }
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
		status = 'initial',
		loader,
		error,
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
			{status === 'done' && (
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
			)}

			{status === 'pending' && <>{loader ? <Spin /> : { loader }}</>}

			{status === 'fail' && (
				<>
					{error && !error.icon ? (
						<ErrorMessage>{error.message ? error.message : 'Произошла ошибка'}</ErrorMessage>
					) : (
						<>{error?.icon}</>
					)}
				</>
			)}
		</Card>
	)
}
