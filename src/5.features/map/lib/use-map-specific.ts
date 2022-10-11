import { useSearchParams } from 'react-router-dom'

export const useMapSpecific = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const setParam = (type: string, id: string) => {
		searchParams.set(type, id)
		setIllustrate(type)
		setSearchParams(searchParams)
	}

	const setIllustrate = (type = 'country') => {
		searchParams.set('illustrate', type)
		setSearchParams(searchParams)
	}

	const setChangedParam = (type: string) => {
		searchParams.set('changed', type)
		setSearchParams(searchParams)
	}

	const removeParam = (type: string) => {
		searchParams.delete(type)
		setSearchParams(searchParams)
	}

	return { setParam, removeParam, setIllustrate, setChangedParam } as const
}
