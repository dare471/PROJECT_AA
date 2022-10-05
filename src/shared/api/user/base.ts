import axios from 'axios'
import { env } from '@/shared/config/env'

export const instance = axios.create({
	baseURL: env.API_URL + '/api/auth'
})
