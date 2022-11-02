import { FC } from 'react'
import { useLocation } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useQueryParam } from 'use-query-params'

import { illustrateParams, modeParams } from '@/3.pages/map'
import { TMode } from '@/3.pages/map/model'

import { TPolygonType } from '@/7.shared/api'
import { routes } from '@/7.shared/config'

export const MapRequireParams =
	(Component: FC): FC =>
	props => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [modeQP] = useQueryParam<TMode>('mode')

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [illustrateQP] = useQueryParam<TPolygonType>('illustrate')

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const location = useLocation()
		const hasModeParam = modeParams.includes(modeQP || '')
		const hasIllustrateParam = illustrateParams.includes(illustrateQP || '')

		return (
			<>
				{hasModeParam && hasIllustrateParam ? (
					<Component {...props} />
				) : (
					<Navigate to={routes.error({})} state={{ from: location }} />
				)}
			</>
		)
	}
