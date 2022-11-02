import axios from 'axios'

import { envVar } from '@/7.shared/config'

import { errorHandleInterceptors } from './../interceptors/index'

export const instance = axios.create({
	baseURL: envVar.API_URL + '/comment'
})

errorHandleInterceptors(instance)
