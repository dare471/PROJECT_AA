import { useState } from 'react'
import { TIin } from './types'

export const useIin = () => {
	const [iin, setIin] = useState<TIin>('')

	return [iin, setIin] as const
}
