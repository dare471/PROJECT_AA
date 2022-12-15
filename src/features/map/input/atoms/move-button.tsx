import { useEvent } from 'effector-react'

import { Button } from '~src/shared/ui'

import * as model from '../model'

export const MoveButton = () => {
	const handleClick = useEvent(model.moveClicked)

	return <Button onClick={() => handleClick()}>Move</Button>
}
