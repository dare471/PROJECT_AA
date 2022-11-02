import { useState } from 'react'

export type TIin = number | ''

export const useIin = () => {
	const [iin, setIin] = useState<TIin>('')

	return [iin, setIin] as const
}
