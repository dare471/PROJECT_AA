export type Session = {
	id: number
	active: 0 | 1
	name: string
	email: string
	role: [0 | 1]
	subscribeRegions: number[]
	unFollowClients: number[]
	favoriteClients: number[]
	token: string
}

export type UserCredentials = {
	user: {
		id: number
		name: string
		email: string
		workPosition: string | null
		active: 0 | 1
		access_availability: [0 | 1]
		subscribesRegion: number[]
		unFollowClients: number[]
		favoriteClients: number[]
	}
	token: string
}

export type SessionHook = {
	active: 0 | 1
	access_availability: [0 | 1]
	subscribesRegion: number[]
	unFollowClients: number[]
	favoriteClients: number[]
}
