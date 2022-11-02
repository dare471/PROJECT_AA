import axios from 'axios'

import { envVar } from '@/7.shared/config'

import {
	dataHandleInterceptors,
	errorHandleInterceptors,
	geometryHandleInterceptors,
	statusHandleInterceptors
} from '../interceptors'

export const instance = axios.create({
	baseURL: envVar.API_URL
})

statusHandleInterceptors(instance)
errorHandleInterceptors(instance)
dataHandleInterceptors(instance)
geometryHandleInterceptors(instance)
