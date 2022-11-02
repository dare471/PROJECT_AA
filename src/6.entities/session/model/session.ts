import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import { AuthApi, TUserCredential } from '@/7.shared/api'
import { RootState } from '@/7.shared/lib/redux'

type TSessionState = {
	userInfo: {
		work_position: string | null
		email: string | null
		role: string | null
		fullName: string | null
	} | null
	userAvatar: string | null
	userToken: string | null
	userName: string | null
	userId: string | null
	success: boolean
	error: string | null
	loading: boolean
}

const NAME_PREFIX = 'Entity:Session'

const initialState = {
	userInfo: null,
	userToken: null,
	userId: null,
	userName: null,
	userAvatar: null,
	success: false,
	error: null,
	loading: false
} as TSessionState

const sessionSlice = createSlice({
	name: NAME_PREFIX,
	initialState,
	reducers: {
		logout(state, action: PayloadAction<undefined>) {
			state.userInfo = null
			state.userToken = null
			state.userAvatar = null
			state.userId = null
			state.userName = null
			state.success = false
			state.error = null
			state.loading = false
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchSignIn.pending, state => {
				state.loading = true
			})
			.addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<TUserCredential>) => {
				const userToken = action.payload.token
				const userId = action.payload.users_data.users_id
				const userName = action.payload.users_data.name
				const userAvatar = action.payload.users_data.avatar
				const email = action.payload.users_data.email
				const role = action.payload.users_data.role
				const work_position = action.payload.users_data.work_position

				state.loading = false
				state.error = null
				state.success = true
				state.userToken = userToken
				state.userName = userName
				state.userId = String(userId)
				state.userAvatar = userAvatar
				state.userInfo = {
					email,
					role,
					work_position,
					fullName: null
				}
			})
			.addCase(fetchSignIn.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	}
})

export const fetchSignIn = createAsyncThunk<TUserCredential, { email: string; password: string }, { state: RootState }>(
	`${NAME_PREFIX}/SignIn`,
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await AuthApi.signIn(email, password)
			return res
		} catch (err: any) {
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message)
			} else {
				return rejectWithValue(err.message)
			}
		}
	}
)

export const userPersistConfig = {
	key: NAME_PREFIX,
	storage,
	whitelist: ['userToken', 'userId', 'userName', 'userImage']
}

export const { logout } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
