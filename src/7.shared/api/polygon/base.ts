import axios from 'axios'
import { envVar } from '@/7.shared/config'
import { checkDataInterceptors, checkGeometryInterceptors, checkStatusInterceptors } from './../interceptors/index'

export const instance = axios.create({
	baseURL: envVar.API_URL
})

checkStatusInterceptors(instance)
checkDataInterceptors(instance)
checkGeometryInterceptors(instance)
