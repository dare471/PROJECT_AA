import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUser, UserApi } from '@/7.shared/api'
import { RootState } from '@/7.shared/lib'
import { IUserState } from './types'

const NAME = 'User'

const userToken = localStorage.getItem('user') ? localStorage.getItem('user') : null
const userId = localStorage.getItem('id') ? localStorage.getItem('id') : null
const userName = localStorage.getItem('name') ? localStorage.getItem('name') : null
const userImage = localStorage.getItem('userImage') ? localStorage.getItem('userImage') : null

const initialState = {
	userInfo: null,
	userToken,
	userId,
	userName,
	userImage,
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
			state.userId = null
			state.userName = null
			state.success = false
			state.error = null
			state.loading = false
			localStorage.removeItem('user')
			localStorage.removeItem('id')
			localStorage.removeItem('name')
			localStorage.removeItem('image')
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchSignIn.pending, state => {
				state.loading = true
			})
			.addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<IUser>) => {
				const userToken = action.payload.token
				const userId = action.payload.users_data.users_id
				const userName = action.payload.users_data.name
				const userImage = action.payload.users_data.image
				const email = action.payload.users_data.email
				const role = action.payload.users_data.role
				const work_position = action.payload.users_data.work_position
				console.log(action.payload)

				localStorage.setItem('user', userToken)
				localStorage.setItem('id', userId)
				localStorage.setItem('name', userName)
				localStorage.setItem('userImage', userImage)
				state.loading = false
				state.error = null
				state.success = true
				state.userToken = userToken
				state.userName = userName
				state.userId = userId
				state.userId = userImage
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

export const fetchSignIn = createAsyncThunk<IUser, { email: string; password: string }, { state: RootState }>(
	`${NAME}/SignUp`,
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await UserApi.signIn(email, password)
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
