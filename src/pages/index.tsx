import { Navigate, Route, Routes } from 'react-router'

import { AuthProvider, GuestProvider } from '~src/entities/session'

import { lazy } from '~src/shared/lib'
import { paths, routes } from '~src/shared/routes'

const HomePage = lazy(() => import('./home'), 'HomePage')
const SignInPage = lazy(() => import('./sign-in'), 'SignInPage')
const MapPage = lazy(() => import('./map'), 'MapPage')
const FavoriteClientCartPage = lazy(() => import('./favorite-client-cart'), 'FavoriteClientCartPage')
const UserPublicProfilePage = lazy(() => import('./user-public-profile'), 'UserPublicProfilePage')
const ErrorPage = lazy(() => import('./error'), 'ErrorPage')

export function Pages() {
	return (
		<Routes>
			<Route path={paths.home} element={<HomePage />} />
			<Route
				path={paths.signIn}
				element={
					<GuestProvider>
						<SignInPage />
					</GuestProvider>
				}
			/>
			<Route
				path={paths.map}
				element={
					<AuthProvider>
						<MapPage />
					</AuthProvider>
				}
			/>

			<Route
				path={paths.favoriteClientCart}
				element={
					<AuthProvider>
						<FavoriteClientCartPage />
					</AuthProvider>
				}
			/>

			<Route
				path={paths.userPublicProfile}
				element={
					<AuthProvider>
						<UserPublicProfilePage />
					</AuthProvider>
				}
			/>

			<Route path={paths.userSettingsProfile} element={<AuthProvider>{/* <UserSettingsProfile /> */}</AuthProvider>} />

			<Route path='error' element={<ErrorPage />} />
			<Route path='*' element={<Navigate to={routes.error()} />} />
		</Routes>
	)
}
