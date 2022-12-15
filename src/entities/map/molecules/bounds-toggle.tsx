import { Model, modelView } from 'effector-factorio'
import { useStore, useUnit } from 'effector-react'
import React from 'react'
import { BsBoundingBoxCircles } from 'react-icons/bs'

import { Toggle } from '~src/shared/ui'

import { mapFactory } from '../map-model'

interface Props {
	model: Model<typeof mapFactory>
	className?: string
}

export const BoundsToggle = modelView(mapFactory, ({ model, className }: Props) => {
	const previewBounds = useStore(model.$previewBounds)
	const [setCurrentBounds, removeBounds] = useUnit([model.currentBoundsSet, model.boundsRemove])
	const isBoundsChecked = Boolean(previewBounds)

	const handleSelect = () => {
		if (isBoundsChecked) {
			removeBounds()
		} else {
			setCurrentBounds()
		}
	}

	return (
		<Toggle className={className} selected={isBoundsChecked} onSelect={handleSelect}>
			<BsBoundingBoxCircles />
		</Toggle>
	)
})
