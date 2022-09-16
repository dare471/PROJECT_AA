import { Navigate, Route, Routes } from 'react-router-dom'
import { PAGE404_ROUTE } from '@/shared/lib'
import { publicRoutes } from '@/shared/routes'

export const AppRouter = ({ ...props }) => {
	return (
		<Routes>
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component {...props} />} />
			))}
			<Route path='*' element={<Navigate to={PAGE404_ROUTE} replace />} />
		</Routes>
	)
}
