import { useUnit } from 'effector-react'
import React from 'react'

import type { createLandsToLand, Land } from '../model'

interface LandsProps<T extends Land> {
	model: ReturnType<typeof createLandsToLand<T>>
	children: (args: { land: T; index: number; onClick: (payload: number) => number }) => React.ReactNode
}

export function Lands<T extends Land>(props: LandsProps<T>) {
	const { model, children } = props
	const [lands, handleLandClick] = useUnit([model._$lands, model.landClicked])

	return (
		<>
			{lands.map((land, index) => (
				<React.Fragment key={index}>{children({ land, index, onClick: handleLandClick })}</React.Fragment>
			))}
		</>
	)
}
