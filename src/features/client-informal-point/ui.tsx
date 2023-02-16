import { Input, Select, Stack, Text } from '@chakra-ui/react'
import { type Model, modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import { Marker } from 'react-leaflet'

import * as model from './model'

export const ClientInformalPointDescriptionInput = modelView(
	model.createClientInformalPoint,
	function ClientInformalPointDescriptionInput({ model }) {
		const [description, handleDescriptionChange] = useUnit([model.$description, model.descriptionChanged])

		return (
			<Stack>
				<Input value={description} onChange={(e) => handleDescriptionChange(e.target.value)} />
				{description === '' && <Text color='red'>Напишите описание места</Text>}
			</Stack>
		)
	},
)

interface ClientInformalPointRefSelectProps {
	model: Model<typeof model.createClientInformalPoint>
	placeholder?: string
}

export const ClientInformalPointRefSelect = modelView(
	model.createClientInformalPoint,
	function ClientInformalPointRefSelect(props: ClientInformalPointRefSelectProps) {
		const { model, placeholder = 'Выберите место' } = props

		const [refs] = useUnit([model.$refs])
		const [selectRef, handleRefChange] = useUnit([model.$selectRef, model.refSelected])

		return (
			<Stack>
				<Select value={selectRef ?? undefined} onChange={(e) => handleRefChange(Number(e.target.value))}>
					<option value={undefined}>{placeholder}</option>
					{refs.map((ref, index) => (
						<option key={index} value={ref.id}>
							{ref.name}
						</option>
					))}
				</Select>
				{!selectRef && <Text color='red'>Выберите место</Text>}
			</Stack>
		)
	},
)

export const ClientInformalPointMarker = modelView(
	model.createClientInformalPoint,
	function ClientInformalPointMarker(props) {
		const { model } = props

		if (model.isMulti) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [markers] = useUnit([model.$markers, model.markerSettled])

			return (
				<>
					{markers.map((marker, index) => (
						<Marker key={index} position={marker} />
					))}
				</>
			)
		} else {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [marker] = useUnit([model.$marker])

			if (!marker) return null

			return (
				<>
					<Marker position={marker} />
				</>
			)
		}
	},
)

export const ClientInformalPointMarkerErrorMessages = modelView(
	model.createClientInformalPoint,
	function ClientInformalPointMarkerErrorMessages(props) {
		const { model } = props

		if (model.isMulti) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [markers] = useUnit([model.$markers])

			return <>{markers.length === 0 && <Text color='red'>Выберите места на карте</Text>}</>
		} else {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [marker] = useUnit([model.$marker])

			return <>{!marker && <Text color='red'>Выберите место на карте</Text>}</>
		}
	},
)
