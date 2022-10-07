import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser, signIn } from '@/7.shared/api'
import { RootState } from '@/7.shared/lib'
import { IUserState } from './types'

const NAME = 'User'

const userToken = localStorage.getItem('user') ? localStorage.getItem('user') : null

const initialState = {
	userInfo: null,
	userToken,
	success: false,
	error: null,
	loading: false
} as IUserState

const userSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		logout(state, action: PayloadAction<undefined>) {
			state.userInfo = null
			state.userToken = null
			state.success = false
			state.error = null
			state.loading = false
			localStorage.removeItem('user')
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchSignIn.pending, state => {
				state.loading = true
			})
			.addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<IUser>) => {
				const userToken = action.payload.token
				const name = action.payload.name
				const email = action.payload.email
				const user_id = action.payload.user_id
				const role = action.payload.role
				const region = action.payload.region
				const work_position = action.payload.work_position

				localStorage.setItem('user', userToken)
				state.loading = false
				state.error = null
				state.success = true
				state.userToken = userToken
				state.userInfo = {
					name,
					email,
					user_id,
					role,
					region,
					work_position
				}
			})
			.addCase(fetchSignIn.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	}
})

export const fetchSignIn = createAsyncThunk<IUser, { email: string; password: string }, { state: RootState }>(
	`${NAME}/SignUp`,
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await signIn(email, password)
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

export const { logout } = userSlice.actions
export const userReducer = userSlice.reducer
