export interface IUserState {
	userInfo: {
		work_position: string | null
		email: string | null
		role: string | null
		fullName: string | null
	} | null
	userImage: string | null
	userToken: string | null
	userName: string | null
	userId: string | null
	success: boolean
	error: string | null
	loading: boolean
}
