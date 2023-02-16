export const paths = {
	home: '/',
	signIn: '/sign-in',
	map: '/map',
	error: '/error',
	favoriteClientCart: '/favorite-client-cart',
	userPublicProfile: '/user/:userId',
	userSettingsProfile: '/settings/profile',
}

export const routes = {
	home: () => paths.home,
	signIn: () => paths.signIn,
	map: () => paths.map,
	favoriteClientCart: () => paths.favoriteClientCart,
	userPublicProfile: (userId: string) => paths.userPublicProfile.replace(':userId', userId),
	userSettingsProfile: () => paths.userSettingsProfile,
	error: () => paths.error,
}
