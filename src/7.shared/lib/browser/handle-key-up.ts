import { KeyboardEvent } from 'react'

type THandleKeyUp = (event: KeyboardEvent<HTMLElement>, onClick: (...childParams: any) => void, ...params: any) => void

export const typedHandleKeyUp: THandleKeyUp = (event, onClick, ...rest) => {
	if (event.key === 'Enter') {
		onClick(event, rest)
	}
}
