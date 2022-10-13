import axios from 'axios'
import { getEnvVar } from '@/7.shared/config'

export const instance = axios.create({
	baseURL: getEnvVar('REACT_APP_API_URL') + '/api/comment'
})
