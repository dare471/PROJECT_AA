import axios from 'axios'
import { envVar } from '@/7.shared/config'

export const instance = axios.create({
	baseURL: envVar.API_URL
})
