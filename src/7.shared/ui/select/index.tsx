import { memo } from 'react'
import ReactSelect from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

export const Select = memo((props: StateManagerProps) => {
	return <ReactSelect {...props} />
})
