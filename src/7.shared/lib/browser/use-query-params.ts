import { useSearchParams } from 'react-router-dom'

/**
 *
 * @remark This hook for Url Query Params
 */

export const useQP = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	/**
	 *
	 * @param key
	 * @param value
	 */

	const setQP = (key: string, value: string) => {
		searchParams.set(key, value)
		setSearchParams(searchParams)
	}

	/**
	 *
	 * @param key
	 * @returns
	 */

	const getQP = (key: string | null) => {
		if (key) {
			return searchParams.get(key)
		}

		return null
	}

	/**
	 *
	 * @param key
	 * @returns
	 */

	const deleteQP = (key: string) => {
		searchParams.delete(key)
		setSearchParams(searchParams)
	}

	return { getQP, setQP, deleteQP }
}
