import { GetTogglePropsInput, GetTogglePropsOutput } from 'react-collapsed/dist/types'

export interface ICollapseButtonProps {
	data: any
	isExpanded: boolean
	getToggleProps?: (config?: GetTogglePropsInput) => GetTogglePropsOutput
	handleClickExpand: any
}
