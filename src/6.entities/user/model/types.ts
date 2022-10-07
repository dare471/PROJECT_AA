export interface IUserState {
	userInfo: {
		name: string | null
		user_id: string | null
		work_position: string | null
		region: string | null
		email: string | null
		role: string | null
	} | null
	userToken: string | null
	success: boolean
	error: string | null
	loading: boolean
}
