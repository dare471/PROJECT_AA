import { Dispatch, SetStateAction } from 'react'
import { TListIllustrate } from '../../types'

export interface ICollapsibleProps {
	data: any
	isExpanded: boolean
	setIsExpanded: Dispatch<SetStateAction<boolean>>
	onClick: any
	listIllustrate: TListIllustrate
	setListIllustrate: Dispatch<SetStateAction<TListIllustrate>>
}
