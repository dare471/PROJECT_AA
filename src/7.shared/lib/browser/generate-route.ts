type TParams = {
	[key: string]: any
}
type TGenerateRouteParams = ({
	path,
	defaultParams,
	defaultQueryParams
}: {
	path: string
	defaultParams?: TParams
	defaultQueryParams?: TParams
}) => ({ params, queryParams }: { params?: TParams; queryParams?: TParams }) => string

export const generateRoute: TGenerateRouteParams =
	({ path, defaultParams, defaultQueryParams }) =>
	({ params, queryParams }) => {
		const commonParams =
			defaultParams || params
				? '/' +
				  paramsToString(
						{
							...defaultParams,
							...params
						},
						(_, value) => `${value}`,
						'/'
				  )
				: ''

		const commonQueryParams =
			defaultQueryParams || queryParams
				? '?' +
				  paramsToString(
						{
							...defaultQueryParams,
							...queryParams
						},
						(key, value) => `${key}=${value}`,
						'&'
				  )
				: ''

		return `/${path}${commonParams}${commonQueryParams}`
	}

const paramsToString = (params: TParams, mapCb: (key: string, value: any) => any, join: any) =>
	Object.entries(params)
		.map((item: any) => mapCb(item[0], item[1]))
		.join(join)
