import { Route, Routes } from 'react-router'

import { lazy } from '~src/shared/lib'

const HomePage = lazy(() => import('./home'), 'HomePage')

export function Pages() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />}></Route>
		</Routes>
	)
}
