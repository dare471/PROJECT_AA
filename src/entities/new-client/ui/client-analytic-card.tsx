import { Card, CardBody } from '@chakra-ui/react'
import { type EffectState } from 'patronum/status'

import { type ClientAnalytic } from '~src/shared/api'
import { DescriptionText, ErrorMessage, Spin } from '~src/shared/ui'

interface ClientAnalyticCardProps extends Partial<ClientAnalytic> {
	status?: EffectState
	loader?: React.ReactNode
	error?: { icon?: React.ReactNode; message?: string }
	onClick?: (args: { event: any; clientId: number; plotCultId: number | undefined; plotId: number }) => void
}

export function ClientAnalyticCard(props: ClientAnalyticCardProps) {
	const {
		year,
		productName,
		culture,
		region,
		percentSubs,
		percentVolume,
		sumSubsClient,
		sumVolumeClient,
		foreignMarkSumSubcides,
		foreignMarkSumVolume,
		status = 'initial',
		loader,
		error,
		onClick,
		...otherProps
	} = props

	return (
		<Card {...otherProps}>
			{status === 'done' && (
				<CardBody>
					{year && <DescriptionText title='Год:'>{year}</DescriptionText>}
					{productName && <DescriptionText title='Продукт:'>{productName}</DescriptionText>}
					{culture && <DescriptionText title='Культура:'>{culture}</DescriptionText>}
					{region && <DescriptionText title='Регион:'>{region}</DescriptionText>}
					{percentSubs && <DescriptionText title='Процент субсидий:'>{percentSubs}</DescriptionText>}
					{percentVolume && <DescriptionText title='Процент объема:'>{percentVolume}</DescriptionText>}
					{sumSubsClient && <DescriptionText title='Сумма субсидий клиента:'>{sumSubsClient}</DescriptionText>}
					{sumVolumeClient && <DescriptionText title='Сумма объема клиента:'>{sumVolumeClient}</DescriptionText>}
					{foreignMarkSumSubcides && (
						<DescriptionText title='Сумма субсидий иностранного рынка:'>{foreignMarkSumSubcides}</DescriptionText>
					)}
					{foreignMarkSumVolume && (
						<DescriptionText title='Сумма объема иностранного рынка:'>{foreignMarkSumVolume}</DescriptionText>
					)}
				</CardBody>
			)}

			{status === 'pending' && <>{loader ? <Spin /> : { loader }}</>}

			{status === 'fail' && (
				<>
					{error && !error.icon ? (
						<ErrorMessage>{error.message ?? 'Произошла ошибка'}</ErrorMessage>
					) : (
						<>{error?.icon}</>
					)}
				</>
			)}
		</Card>
	)
}
