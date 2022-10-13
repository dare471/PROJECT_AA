import { FC } from 'react'
import { useLocation } from 'react-router'
import { Navigate, useSearchParams } from 'react-router-dom'
import { illustrateParams, modeParams } from '@/3.pages/map'
import { ERROR_ROUTE } from '@/7.shared/config'

export const MapRequireParams = (Component: FC): FC => {
	return props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [searchParams] = useSearchParams()
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const location = useLocation()
		const hasModeParam = modeParams.includes(searchParams.get('mode') || '')
		const hasIllustrateParam = illustrateParams.includes(searchParams.get('illustrate') || '')

		return (
			<>
				{hasModeParam && hasIllustrateParam ? (
					<Component {...props} />
				) : (
					<Navigate to={ERROR_ROUTE} state={{ from: location, relation: 'You need have illustrate and mode params' }} />
				)}
			</>
		)
	}
}
