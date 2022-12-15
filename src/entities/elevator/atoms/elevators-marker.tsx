import { modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'

import { CreateMap } from '~src/entities/map'

import { elevatorsFactory } from '../model'

export const ElevatorsMarker = modelView(elevatorsFactory, ({ model }) => {
	// const elevatorIcon = icon({ iconUrl: '', iconSize: [15, 15] })
	const [elevators] = useUnit([model.$elevators])

	if (!elevators) return null

	return (
		<>
			{elevators.map((elevator) => {
				if (!elevator.latitude || !elevator.longitude) return null

				return (
					<CreateMap.Marker
						key={elevator.id}
						position={[elevator.latitude, elevator.longitude] as any}
						// options={{ icon: elevatorIcon }}
					/>
				)
			})}
		</>
	)
})
