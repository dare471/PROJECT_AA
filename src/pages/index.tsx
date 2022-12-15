import { Navigate, Route, Routes } from 'react-router-dom'

import { routesMap } from '~src/pages/routes'

export const Pages = () => {
	return (
		<Routes>
			<Route path='/'>
				<Route index element={<Navigate to={routesMap.home.redirect} />} />
				<Route path={routesMap.home.path} element={<routesMap.home.element />} />
			</Route>

			<Route path={routesMap.map.path}>
				<Route index element={<routesMap.map.element />} />
			</Route>

			<Route path={routesMap.mapPlayGround.path}>
				<Route index element={<routesMap.mapPlayGround.element />} />
			</Route>

			<Route path={routesMap.error.path} element={<routesMap.error.element />} />

			<Route path='*' element={<Navigate to={routesMap.error.redirect} />} />
		</Routes>
	)
}
