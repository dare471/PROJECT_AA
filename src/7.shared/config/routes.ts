export const HOME_ROUTE = '/home'
export const MAP_ROUTE = '/map'
export const SIGN_IN_ROUTE = '/login'
export const ERROR_ROUTE = '/error'

export const ROUTE_TO_HOME = (params: string[] = [], queryParams: string[] = []) =>
	`${HOME_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`
export const ROUTE_TO_MAP = (params: string[] = [], queryParams: string[] = ['illustrate=country', 'mode=false']) =>
	`${MAP_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`

export const ROUTE_TO_LOGIN = (params: string[] = [], queryParams: string[] = []) =>
	`${SIGN_IN_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`

export const ROUTE_TO_ERROR = (params: string[] = ['404'], queryParams: string[] = []) =>
	`${ERROR_ROUTE}${params.length > 0 ? `/${params.join('/')}` : ''}${
		queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
	}`
