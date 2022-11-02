type TParams = {
	[key: string]: any
}

type TGenerateRouteParams = {
	path: string
	defaultParams?: TParams
	defaultQueryParams?: TParams
}

type TRouteParams = {
	params?: TParams
	queryParams?: TParams
}

/**
 *
 * @param generateRouteParams
 *
 * @returns String URL with params and query params
 */

export const generateRoute =
	({ path, defaultParams, defaultQueryParams }: TGenerateRouteParams) =>
	(routeParams?: TRouteParams): string => {
		const [params, queryParams] = routeParams ? [routeParams.params, routeParams.queryParams] : []

		/**
		 * @remark Params
		 */
		const defaultParamsArr = defaultParams ? objToMapperArr(defaultParams, (_, value) => String(value)) : []
		const paramsArr = params ? objToMapperArr(params, (_, value) => String(value)) : []
		const resultParams = [...defaultParamsArr, ...paramsArr].join('/')

		/**
		 * @remark Query Params
		 */

		const defaultQueryParamsArr = defaultQueryParams
			? objToMapperArr(defaultQueryParams, (key, value) => `${key}=${value}`)
			: []
		const queryParamsArr = queryParams ? objToMapperArr(queryParams, (key, value) => `${key}=${value}`) : []
		const resultQueryParams = [...defaultQueryParamsArr, ...queryParamsArr].join('&')

		return `/${path}${resultParams ? '/' + resultParams : ''}${resultQueryParams ? '?' + resultQueryParams : ''}`
	}

const objToMapperArr = (params: TParams, mapCb: (key: string, value: any) => unknown) =>
	Object.entries(params).map((item: any) => mapCb(item[0], item[1]))
