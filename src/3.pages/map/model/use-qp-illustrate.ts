import { useEffect, useState } from 'react'
import { useMapQP } from '@/5.features/map/lib'
import { useQP } from '@/7.shared/lib'
import { TIllustrate } from '../types'

export const useIllustrateQP = () => {
	const [illustrate, setIllustrate] = useState<TIllustrate>(null)
	const { getIllustrateQP, setIllustrateQP, getModeQP } = useMapQP()
	const { getQP, deleteQP } = useQP()
	const illustrateDataQP = getQP(illustrate)
	const illustrateQP = getIllustrateQP() as TIllustrate
	const modeQP = getModeQP()

	useEffect(() => {
		if (modeQP === 'true') {
			setIllustrate(illustrateQP)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modeQP])

	useEffect(() => {
		console.log(illustrate, 'illustrate')
		if (illustrate) {
			setIllustrateQP(illustrate)
		} else if (illustrate === null && modeQP === 'false') {
			setIllustrate('country')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrate])

	useEffect(() => {
		console.log(illustrateQP, 'illustrateQP')
	}, [illustrateQP])

	// useEffect(() => {
	// 	if (illustrate === 'region') {
	// 		deleteQP('district')
	// 		deleteQP('client')
	// 		deleteQP('clientPolygon')
	// 	}
	// }, [illustrateDataQP])

	return [illustrate, setIllustrate] as const
}
