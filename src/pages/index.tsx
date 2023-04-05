import { Route, Routes } from 'react-router'

import { AuthProtect, GuestProvider, RoleProtect } from '~src/entities/session'

import { lazy } from '~src/shared/lib'
import { paths } from '~src/shared/routes'

const HomePage = lazy(() => import('./home'), 'HomePage')
const SignInPage = lazy(() => import('./sign-in'), 'SignInPage')
const MapPage = lazy(() => import('./map'), 'MapPage')
const FavoriteClientsPage = lazy(() => import('./favorite-clients'), 'FavoriteClientsPage')
const SettingsPage = lazy(() => import('./settings'), 'SettingsPage')
const SettingsProfilePage = lazy(() => import('./settings-profile'), 'SettingsProfilePage')
const SettingsContractsPage = lazy(() => import('./settings-contracts'), 'SettingsContractsPage')
const SettingsSubscribesRegionsPage = lazy(
	() => import('./settings-subscribes-regions'),
	'SettingsSubscribesRegionsPage',
)
const ProfilePage = lazy(() => import('./profile'), 'ProfilePage')
const SettingsSubscribesClientsPage = lazy(
	() => import('./settings-subscribes-clients'),
	'SettingsSubscribesClientsPage',
)
const MeetingDetailsPage = lazy(() => import('./meeting-details'), 'MeetingDetailsPage')
const MeetingDetailsMobilePage = lazy(() => import('./meeting-details-mobile'), 'MeetingDetailsMobilePage')
const ClientBusinessPointMobilePage = lazy(
	() => import('./client-business-point-mobile'),
	'ClientBusinessPointMobilePage',
)
// const MapPlayGroundPage = lazy(() => import('./map-play-ground'), 'MapPlayGroundPage')
const ClientProfilePage = lazy(() => import('./client-profile'), 'ClientProfilePage')
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
					<AuthProtect>
						<MapPage />
					</AuthProtect>
				}
			/>
			<Route
				path={paths.favoriteClients}
				element={
					<AuthProtect>
						<RoleProtect whenRole='director'>
							<FavoriteClientsPage />
						</RoleProtect>
					</AuthProtect>
				}
			/>
			<Route path={paths.profile} element={<ProfilePage />} />
			<Route
				element={
					<AuthProtect>
						<SettingsPage />
					</AuthProtect>
				}
			>
				<Route path={paths.settingsProfile} element={<SettingsProfilePage />} />
				<Route path={paths.settingsContracts} element={<SettingsContractsPage />} />
				<Route
					path={paths.settingsSubscribesRegions}
					element={
						<RoleProtect whenRole='director'>
							<SettingsSubscribesRegionsPage />
						</RoleProtect>
					}
				/>
				<Route
					path={paths.settingsSubscribesClients}
					element={
						<RoleProtect whenRole='director'>
							<SettingsSubscribesClientsPage />
						</RoleProtect>
					}
				/>
			</Route>
			<Route
				path={paths.clientProfile}
				element={
					<AuthProtect>
						<ClientProfilePage />
					</AuthProtect>
				}
			/>
			<Route
				path={paths.meetingDetails}
				element={
					<AuthProtect>
						<MeetingDetailsPage />
					</AuthProtect>
				}
			/>
			<Route path={paths.meetingDetailsMobile} element={<MeetingDetailsMobilePage />} />
			<Route path={paths.clientBusinessPointMobile} element={<ClientBusinessPointMobilePage />} />
			<Route path={paths.noMatch} element={<ErrorPage />} />
		</Routes>
	)
}
