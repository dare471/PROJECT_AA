type TParams = Record<string, any>

type TGetRouteParams = {
	path: string
	parentPath?: string | string[]
	params?: TParams
	queryParams?: TParams
}

export function getRoute({ path, parentPath, params, queryParams }: TGetRouteParams) {
	const resultParams = objectToMapStr({ params, fn: ({ value }) => `/${value}` })

	const resultQueryParams = objectToMapStr({
		params: queryParams,
		fn: ({ key, value }, index) => (index === 0 ? `?${key}=${value}` : `&${key}=${value}`)
	})

	if (parentPath instanceof Array) {
		return (
			[...parentPath, path].map((item) => `/${item}`).join('') + resultParams + resultQueryParams
		)
	} else if (parentPath) {
		return [parentPath, path].map((item) => `/${item}`).join('') + resultParams + resultQueryParams
	} else {
		return `/${path}` + resultParams + resultQueryParams
	}
}

function objectToMapStr({
	params,
	fn
}: {
	params?: TParams
	fn: ({ key, value }: { key: string; value: any }, index: number, array: unknown[]) => unknown
}) {
	if (!params) return []

	return Object.entries(params)
		.map((item: any, index, array) => fn({ key: item[0], value: item[1] }, index, array))
		.join('')
}
