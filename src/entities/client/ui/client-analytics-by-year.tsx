import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	type AccordionProps,
	Card,
	CardBody,
	Center,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import type { ClientAnalytic } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

import { type createClientAnalyticsByYear } from '../model'

interface ClientAnalyticsByYearProps extends AccordionProps {
	model: ReturnType<typeof createClientAnalyticsByYear>
}

export function ClientAnalyticsByYear(props: ClientAnalyticsByYearProps) {
	const { model, ...otherProps } = props
	const [analyticsByYear, analyticsByYearPending] = useUnit([
		model.$clientAnalyticsByYear,
		model.$clientAnalyticsPending,
	])

	if (analyticsByYearPending) {
		return (
			<Center>
				<Spinner color='blue.500' />
			</Center>
		)
	}

	return (
		<>
			{Object.keys(analyticsByYear).length !== 0 ? (
				<Accordion {...otherProps}>
					{Object.keys(analyticsByYear).map((year, index) => (
						<AccordionItem key={index}>
							<AccordionButton justifyContent='space-between'>
								<Text>{year}</Text>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel>
								<Stack>
									{analyticsByYear[year]!.map((analytic, index) => (
										<ClientAnalyticCard key={index} analytic={analytic} />
									))}
								</Stack>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<Center>Нету данных</Center>
			)}
		</>
	)
}

interface ClientAnalyticCardProps {
	analytic: ClientAnalytic
}

export function ClientAnalyticCard(props: ClientAnalyticCardProps) {
	const { analytic } = props

	return (
		<Card bgColor='blue.500' color='white'>
			<CardBody>
				<Text fontWeight='bold' fontSize='2xl' color='blue.100'>
					{analytic.productName}
				</Text>
				<DescriptionText title='Сумма субссидий клиента:'>{analytic.sumSubsClient.toLocaleString()}</DescriptionText>
				<DescriptionText title='Сумма субссидий aрегиона:'>
					{analytic.foreignMarkSumSubcides.toLocaleString()}
				</DescriptionText>
				<DescriptionText title='Доля клиента от рынка:'>{analytic.percentSubs.toLocaleString()}%</DescriptionText>
				<DescriptionText title='Объем закупа:'>{analytic.sumVolumeClient.toLocaleString()}</DescriptionText>
				<DescriptionText title='Объем закупа рынка:'>{analytic.foreignMarkSumVolume.toLocaleString()}</DescriptionText>
				<DescriptionText title='Доля клиента от рынка (в объеме):'>
					{analytic.percentVolume.toLocaleString()}%
				</DescriptionText>
				<DescriptionText title='Культура:'>{analytic.culture}</DescriptionText>
			</CardBody>
		</Card>
	)
}
