import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Templates } from '@/4.widgets/templates'
import { ROUTE_TO_ERROR, ROUTE_TO_HOME } from '@/7.shared/config'
import { publicRouteMap } from './_routes'

export const AppRouter: FC = () => {
	return (
		<Routes>
			{/* Route Pages */}
			<Route path='/' element={<Templates.Main />}>
				<Route index element={<Navigate to={ROUTE_TO_HOME()} />} />
				<Route path={publicRouteMap.home.path} element={<publicRouteMap.home.element />} />
				<Route path={publicRouteMap.map.path} element={<publicRouteMap.map.element />} />
				<Route path={publicRouteMap.signIn.path} element={<publicRouteMap.signIn.element />} />

				<Route path={publicRouteMap.profile.path}>
					<Route index element={<Navigate to={ROUTE_TO_ERROR()} />} />
					<Route path=':id' element={<publicRouteMap.profile.element />} />
				</Route>
			</Route>

			{/* Route Errors */}
			<Route path={publicRouteMap.error.path}>
				<Route index element={<Navigate to={ROUTE_TO_ERROR()} />} />
				<Route path=':errorStatus' element={<publicRouteMap.error.element />} />
			</Route>

			<Route path='*' element={<Navigate to={ROUTE_TO_ERROR()} />}></Route>
		</Routes>
	)
}
