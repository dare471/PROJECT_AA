import { TIllustrate, TMode } from '@/3.pages'
import { useQP } from '@/7.shared/lib'

export const useMapQP = () => {
	const { getQP, setQP } = useQP()

	/**
	 *
	 * @param key Illustrate value
	 * @param value IllustrateData Value
	 *
	 * @remark Set query params Illustrate with IllustrateData
	 */

	/**
	 *
	 * @param value
	 */

	const setIllustrateQP = (value: TIllustrate) => {
		if (value) {
			setQP('illustrate', value)
		}
	}

	/**
	 *
	 * @returns
	 */

	const getIllustrateQP = () => {
		return getQP('illustrate')
	}

	/**
	 *
	 * @returns
	 */

	const setIllustrateDataQP = (key: TIllustrate, value: string) => {
		if (key) {
			setQP(key, value)
		}
	}

	/**
	 *
	 * @param value
	 */

	const setModeQP = (value: TMode) => {
		setQP('mode', value)
	}

	const getModeQP = () => {
		return getQP('mode')
	}

	return { setIllustrateDataQP, getIllustrateQP, setIllustrateQP, getModeQP, setModeQP } as const
}
