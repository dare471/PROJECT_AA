import axios from 'axios'

import { envVar } from '@/7.shared/config'

import { errorHandleInterceptors } from '../interceptors'

//TODO: add '/iin'
export const instance = axios.create({
	baseURL: envVar.API_URL
})

errorHandleInterceptors(instance)
