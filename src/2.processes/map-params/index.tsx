import { FC } from 'react'
import { useLocation } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useQueryParam } from 'use-query-params'
import { illustrateParams, modeParams } from '@/3.pages/map'
import { ERROR_ROUTE } from '@/7.shared/config'

export const MapRequireParams = (Component: FC): FC => {
	return props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [modeQP] = useQueryParam<string>('mode')

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [illustrateQP] = useQueryParam<string>('illustrate')

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const location = useLocation()
		const hasModeParam = modeParams.includes(modeQP || '')
		const hasIllustrateParam = illustrateParams.includes(illustrateQP || '')

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
