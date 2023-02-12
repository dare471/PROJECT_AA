import { Route, Routes } from 'react-router'

import { lazy } from '~src/shared/lib'
import { paths } from '~src/shared/routes'

const HomePage = lazy(() => import('./home'), 'HomePage')
const MapPage = lazy(() => import('./map'), 'MapPage')

export function Pages() {
	return (
		<Routes>
			<Route path={paths.home} element={<HomePage />} />
			<Route path={paths.map} element={<MapPage />}></Route>
		</Routes>
	)
}
