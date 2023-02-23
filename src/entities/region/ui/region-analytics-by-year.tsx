import {
	Accordion,
	AccordionButton,
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

import type { RegionAnalytic } from '~src/shared/api'
import { DescriptionText } from '~src/shared/ui'

import type { createRegionsAnalyticsByYear } from '../model'

interface RegionsAnalyticsByYearProps extends AccordionProps {
	model: ReturnType<typeof createRegionsAnalyticsByYear>
}

export function RegionsAnalyticsByYear(props: RegionsAnalyticsByYearProps) {
	const { model, ...otherProps } = props
	const [analyticsByYear, analyticsByYearPending] = useUnit([
		model.$regionsAnalyticsByYear,
		model.$regionsAnalyticsPending,
	])

	if (analyticsByYearPending) {
		return (
			<Center>
				<Spinner color='blue.500' />
			</Center>
		)
	}

	return (
		<Accordion {...otherProps}>
			{Object.keys(analyticsByYear).map((year, index) => (
				<AccordionItem key={index}>
					<AccordionButton>{year}</AccordionButton>
					<AccordionPanel>
						<Stack>
							{analyticsByYear[year]!.map((analytic, index) => (
								<RegionAnalyticCard key={index} analytic={analytic} />
							))}
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	)
}

interface RegionAnalyticCardProps {
	analytic: RegionAnalytic
}

export function RegionAnalyticCard(props: RegionAnalyticCardProps) {
	const { analytic } = props

	return (
		<Card bgColor='blue.500' color='white'>
			<CardBody>
				<Text fontWeight='bold' fontSize='2xl' color='blue.100'>
					{analytic.regionName}
				</Text>
				<DescriptionText title='Количество клиентов в Области:'>
					{analytic.clientCountAll.toLocaleString()}
				</DescriptionText>
				<DescriptionText title='Площадь клиентов в области:'>{analytic.clientAreaAll.toLocaleString()}</DescriptionText>
				<DescriptionText title='Доля количества клиентов (АА):'>
					{analytic.clientProcAA.toLocaleString()}%
				</DescriptionText>
				<DescriptionText title='Доля количества клиентов (Конкуренты):'>
					{analytic.clientProcOth.toLocaleString()}%
				</DescriptionText>
				<DescriptionText title='Количество клиентов АА:'>{analytic.clientCountAA.toLocaleString()}</DescriptionText>
				<DescriptionText title='Количество клиентов (Конкуренты):'>
					{analytic.clientCountOth.toLocaleString()}
				</DescriptionText>
				<DescriptionText title='Доля площади (АА):'>{analytic.clientAreaAAProc.toLocaleString()}%</DescriptionText>
				<DescriptionText title='Доля площади (Конкуренты):'>
					{analytic.clientAreaOthProc.toLocaleString()}%
				</DescriptionText>
				<DescriptionText title='Площадь клиентов (АА):'>{analytic.clientAreaAA.toLocaleString()}</DescriptionText>
				<DescriptionText title='Площадь клиентов (Конкурентов):'>
					{analytic.clientAreaOth.toLocaleString()}
				</DescriptionText>
			</CardBody>
		</Card>
	)
}
