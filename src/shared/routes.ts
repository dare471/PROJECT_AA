export const paths = {
	home: '/',
	signIn: '/sign-in',
	map: '/map',
	error: '/error',
	favoriteClientCart: '/favorite-client-cart',
	userProfile: '/user/:userId',
	userSettings: '/settings/profile',
	mapPlayGround: '/map-play-ground',
	clientProfile: '/client/:clientId',
}

export const routes = {
	home: () => paths.home,
	signIn: () => paths.signIn,
	map: () => paths.map,
	favoriteClientCart: () => paths.favoriteClientCart,
	userProfile: ({ userId }: { userId: string }) => paths.userProfile.replace(':userId', userId),
	userSettings: () => paths.userSettings,
	clientProfile: ({ clientId }: { clientId: string }) => paths.clientProfile.replace(':clientId', clientId),
	mapPlayGround: () => paths.mapPlayGround,
	error: () => paths.error,
}
