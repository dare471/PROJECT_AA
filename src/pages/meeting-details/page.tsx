import { TimeIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Card,
	CardBody,
	Checkbox,
	Container,
	Divider,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import React from 'react'
import { TbPlayerStop } from 'react-icons/tb'
import { VscDebugStart } from 'react-icons/vsc'
import { useParams } from 'react-router'

import { Header } from '~src/widgets/header'

import { fromTimestampToTimer } from '~src/features/timer'

import { DescriptionText, Empty, FullSpinner } from '~src/shared/ui'

import * as model from './model'

export function MeetingDetailsPage() {
	const [handleMount, handleUnmount] = useUnit([model.meetingDetailsPageMounted, model.meetingDetailsPageUnMounted])
	const [meetingDetails, meetingDetailsPending] = useUnit([
		model.$$meetingDetails.$meetingDetails,
		model.$meetingDetailsPending,
	])
	const { meetingId } = useParams()
	console.log(meetingDetails)

	React.useEffect(() => {
		handleMount({ meetingId: Number(meetingId) })

		return () => handleUnmount()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box position='relative'>
			<Header />
			<Container maxW='container.lg' py='14' position='relative'>
				{meetingDetailsPending ? (
					<FullSpinner h='full' />
				) : (
					<Stack spacing='8'>
						<MeetingDetails />
						<MeetingHistory />
					</Stack>
				)}

				{meetingDetails && !meetingDetails?.client.statusVisit && (
					<Box position='fixed' bottom='5' right='5'>
						<MeetingTimerButton />
					</Box>
				)}
			</Container>

			<MeetingSurveyModal />
		</Box>
	)
}

function MeetingTimer() {
	const timer = useUnit(model.$$meetingTimer.$timer)

	return (
		<Stack direction='row' align='center' gap='2'>
			<TimeIcon fontSize='2xl' />
			<Text fontSize='md' fontWeight='bold'>
				Таймер встречи: {fromTimestampToTimer(timer)}
			</Text>
		</Stack>
	)
}

function MeetingTimerButton() {
	const [isMeetingTimerRunning, handleMeetingTimerStart, handleMeetingTimerStop] = useUnit([
		model.$$meetingTimer.$isRunning,
		model.$$meetingTimer.timerStarted,
		model.$$meetingTimer.timerStopped,
	])

	return (
		<>
			{!isMeetingTimerRunning ? (
				<Button size='lg' borderRadius='3xl' colorScheme='blue' onClick={handleMeetingTimerStart}>
					<Icon as={VscDebugStart} />
				</Button>
			) : (
				<Button size='lg' borderRadius='3xl' colorScheme='red' onClick={handleMeetingTimerStop}>
					<Icon as={TbPlayerStop} />
				</Button>
			)}
		</>
	)
}

function MeetingDetails() {
	const [meetingDetails] = useUnit([model.$$meetingDetails.$meetingDetails])

	if (!meetingDetails) {
		return <Empty>Нету данных по встрече</Empty>
	}

	return (
		<Card>
			<CardBody>
				<Stack>
					<MeetingTimer />
					<Text fontSize='xl' fontWeight='bold'>
						{meetingDetails?.client.clientName}
					</Text>
					<Divider />
					<DescriptionText title='Иин:'>{meetingDetails?.client.clientIin}</DescriptionText>
					<DescriptionText title='Адрес:'>{meetingDetails?.client.address}</DescriptionText>
				</Stack>
			</CardBody>
		</Card>
	)
}

function MeetingHistory() {
	const [meetingDetails] = useUnit([model.$$meetingDetails.$meetingDetails])

	if (!meetingDetails || !meetingDetails?.client.statusVisit) return null

	return (
		<Stack>
			<Text fontSize='medium' fontWeight='medium'>
				История встречи
			</Text>
			<Card>
				<CardBody>
					<Stack>
						<Stack>
							<Text fontSize='xl' fontWeight='medium'>
								Предоставленные услуги
							</Text>
							<Stack>
								{meetingDetails.providedServices?.map((service, index) => (
									<Card key={index}>
										<CardBody>{service.name}</CardBody>
									</Card>
								))}
							</Stack>
						</Stack>
						<Stack>
							<Text fontSize='xl' fontWeight='medium'>
								Проблемы по контракту
							</Text>
							<Stack>
								{meetingDetails.contractComplications?.map((complication, index) => (
									<Card key={index}>
										<CardBody>{complication.name}</CardBody>
									</Card>
								))}
							</Stack>
						</Stack>
						<Stack>
							<Text fontSize='xl' fontWeight='medium'>
								Проблемы по контракту
							</Text>
							<Stack>
								{meetingDetails.plotInspects?.map((inspect, index) => (
									<Card key={index}>
										<CardBody>{inspect.name}</CardBody>
									</Card>
								))}
							</Stack>
						</Stack>
						<Stack>
							<Text fontSize='xl' fontWeight='medium'>
								Проблемы по контракту
							</Text>
							<Stack>
								{meetingDetails.recommends?.map((recommend, index) => (
									<Card key={index}>
										<CardBody>{recommend.name}</CardBody>
									</Card>
								))}
							</Stack>
						</Stack>
					</Stack>
				</CardBody>
			</Card>
		</Stack>
	)
}

function MeetingSurveyModal() {
	0
	const [modals, handleClose] = useUnit([model.$$modals.$modalsState, model.$$modals.modalCloseClicked])
	const [currentStep, handleStepNext, handleStepPrev] = useUnit([
		model.$$meetingSteps.$currentStep,
		model.$$meetingSteps.setStepNext,
		model.$$meetingSteps.setStepPrev,
	])
	const [isNextDisable] = useUnit([model.$isNextDisable])

	return (
		<Modal
			isCentered
			size='6xl'
			isOpen={modals.meetingSurvey}
			onClose={() => handleClose({ modalName: 'meetingSurvey' })}
			scrollBehavior='inside'
		>
			<ModalOverlay />
			<ModalContent h='xl'>
				<ModalBody>
					{currentStep === 'services' && <MeetingServices />}
					{currentStep === 'plotInspects' && <MeetingPlotInspects />}
					{currentStep === 'contractComplications' && <MeetingContractComplications />}
					{currentStep === 'recommends' && <MeetingRecommends />}
				</ModalBody>
				<ModalFooter>
					<Stack direction='row'>
						{currentStep !== 'services' && (
							<Button colorScheme='blue' onClick={handleStepPrev}>
								Назад
							</Button>
						)}
						{currentStep !== 'recommends' ? (
							<Button colorScheme='blue' isDisabled={isNextDisable} onClick={handleStepNext}>
								Дальше
							</Button>
						) : (
							<Button colorScheme='red' onClick={() => model.meetingSurveyEndClicked()}>
								Завершить
							</Button>
						)}
					</Stack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

function MeetingServices() {
	const [meetingServicesRefs, selectMeetingServices] = useUnit([
		model.$$meetingServicesRefs.$meetingServicesRefs,
		model.$selectMeetingServices,
	])

	const [handleMeetingServiceToggle] = useUnit([model.meetingServiceToggled])

	return (
		<Stack>
			<Text fontSize='xl' fontWeight='bold'>
				Заполните какие услуги были предоставлены?
			</Text>
			<Divider />
			{meetingServicesRefs.map((serviceRef, index) => (
				<Stack key={index} direction='row' justify='space-between'>
					<Text>{serviceRef.name}</Text>
					<Checkbox
						size='lg'
						isChecked={!!selectMeetingServices.find((item) => item.id === serviceRef.id)}
						onChange={(e) => handleMeetingServiceToggle({ value: e.target.checked, meetingService: serviceRef })}
					/>
				</Stack>
			))}
		</Stack>
	)
}

function MeetingPlotInspects() {
	const [meetingPlotInspectsRefs, selectMeetingPlotInspects] = useUnit([
		model.$$meetingPlotInspectsRefs.$meetingPlotInspectsRefs,
		model.$selectMeetingPlotInspects,
	])

	const [handlePlotInspectToggled] = useUnit([model.meetingPlotInspectToggled])

	return (
		<Stack>
			<Text fontSize='xl' fontWeight='bold'>
				Заполните отчет по осмотру участка
			</Text>
			<Divider />
			<Stack>
				{meetingPlotInspectsRefs.map((plotInspectsRef, index) => (
					<Stack key={index}>
						<Text fontSize='md' fontWeight='bold'>
							{plotInspectsRef[0]?.category}
						</Text>
						<Divider />
						{plotInspectsRef.map((plotInspectRef, index) => (
							<Stack key={index} direction='row' justify='space-between'>
								<Text>{plotInspectRef.name}</Text>
								<Checkbox
									size='lg'
									isChecked={!!selectMeetingPlotInspects.find((item) => item.id === plotInspectRef.id)}
									onChange={(e) =>
										handlePlotInspectToggled({ value: e.target.checked, meetingPlotInspect: plotInspectRef })
									}
								/>
							</Stack>
						))}
					</Stack>
				))}
			</Stack>
		</Stack>
	)
}

function MeetingContractComplications() {
	const [meetingContractComplicationsRefs, selectContractComplications] = useUnit([
		model.$$meetingContractComplicationsRefs.$meetingContractComplicationsRefs,
		model.$selectMeetingContractComplications,
	])

	const [handleContractComplication] = useUnit([model.meetingContractComplicationToggled])

	return (
		<Stack>
			<Text fontSize='xl' fontWeight='bold'>
				Заполните сложности заключения договора
			</Text>
			{meetingContractComplicationsRefs.map((contractComplicationRef, index) => (
				<Stack key={index} direction='row' justify='space-between'>
					<Text>{contractComplicationRef.name}</Text>
					<Checkbox
						size='lg'
						isChecked={!!selectContractComplications.find((item) => item.id === contractComplicationRef.id)}
						onChange={(e) =>
							handleContractComplication({
								value: e.target.checked,
								meetingContractComplication: contractComplicationRef,
							})
						}
					/>
				</Stack>
			))}
		</Stack>
	)
}

function MeetingRecommends() {
	const [meetingRecommends] = useUnit([model.$$meetingRecommendsRefs.$meetingRecommendsRefs])

	return (
		<Stack>
			<Text fontSize='md' fontWeight='bold'>
				Заполните рекомендаций
			</Text>

			{meetingRecommends.map((recommend, index) => (
				<Stack key={index}>
					<Input placeholder={recommend.name} />
				</Stack>
			))}
		</Stack>
	)
}
