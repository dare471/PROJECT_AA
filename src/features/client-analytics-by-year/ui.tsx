import { Accordion, AccordionButton, AccordionItem, AccordionPanel, type AccordionProps, Stack } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import { ClientAnalyticCard } from '~src/entities/new-client'

import { Empty, Spin } from '~src/shared/ui'

import { type createClientAnalyticsByYear } from './model'

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
		return <Spin />
	}

	if (Object.keys(analyticsByYear).length === 0) {
		return <Empty>Нету данных</Empty>
	}

	return (
		<>
			<Accordion {...otherProps}>
				{Object.keys(analyticsByYear).map((year, index) => (
					<AccordionItem key={index}>
						<AccordionButton>{year}</AccordionButton>
						<AccordionPanel>
							<Stack>
								{analyticsByYear[year]!.map((analyticByYear, index) => (
									<ClientAnalyticCard key={index} {...analyticByYear} />
								))}
							</Stack>
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	)
}
