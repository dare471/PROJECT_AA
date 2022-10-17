import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Templates } from '@/4.widgets/templates'
import { routes } from '@/7.shared/config'
import { publicRouteMap } from './_routes'

export const AppRouter: FC = () => {
	return (
		<Routes>
			{/* Route Pages */}
			<Route path='/' element={<Templates.Main />}>
				<Route index element={<Navigate to={routes.home({})} />} />
				<Route path={publicRouteMap.home.path} element={<publicRouteMap.home.element />} />
				<Route path={publicRouteMap.map.path} element={<publicRouteMap.map.element />} />
				<Route path={publicRouteMap.signIn.path} element={<publicRouteMap.signIn.element />} />

				<Route path={publicRouteMap.profile.path}>
					<Route index element={<Navigate to={routes.error({})} />} />
					<Route path=':id' element={<publicRouteMap.profile.element />} />
				</Route>
			</Route>

			{/* Route Errors */}
			<Route path={publicRouteMap.error.path}>
				<Route index element={<Navigate to={routes.error({})} />} />
				<Route path=':errorStatus' element={<publicRouteMap.error.element />} />
			</Route>

			<Route path='*' element={<Navigate to={routes.error({})} />}></Route>
		</Routes>
	)
}
