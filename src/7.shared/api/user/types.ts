export interface IUser {
	users_data: {
		name: string
		email: string
		users_id: string
		work_position: string
		role: string
		image: string
	}
	status: boolean
	token: string
}

export interface IUserInfo {
	USERS_GUID: string
	ID: string
	FULL_NAME: string
	DIRECTION: string
	POSITION: string
	EMAIL: string
	PHONE: string
	SUBDIVISION: string
	CRM_CATO: string | null
}
