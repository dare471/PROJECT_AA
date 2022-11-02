import { Navigate, Route, Routes } from 'react-router'
import { useLocation } from 'react-router'

import { routes } from '@/7.shared/config'
import { Templates } from '@/7.shared/ui/templates'

import { publicRouteMap } from './_routes'

export const Routing = () => {
	const location = useLocation()

	return (
		<Routes>
			{/* Route Pages */}
			<Route path='/' element={<Templates.Main />}>
				<Route index element={<Navigate to={routes.home({})} />} />
				<Route path={publicRouteMap.home.path} element={<publicRouteMap.home.element />} />
				<Route path={publicRouteMap.map.path} element={<publicRouteMap.map.element />} />
				<Route path={publicRouteMap.signIn.path} element={<publicRouteMap.signIn.element />} />

				<Route path={publicRouteMap.profile.path}>
					<Route index element={<Navigate to={routes.signIn({})} state={{ from: location }} />} />
					<Route path=':id' element={<publicRouteMap.profile.element />} />
				</Route>
			</Route>

			{/* Route Errors */}
			<Route path={publicRouteMap.error.path}>
				<Route index element={<Navigate to={routes.error({})} state={{ from: location }} />} />
				<Route path=':errorStatus' element={<publicRouteMap.error.element />} />
			</Route>

			<Route path='*' element={<Navigate to={routes.error({})} state={{ from: location }} />}></Route>
		</Routes>
	)
}
