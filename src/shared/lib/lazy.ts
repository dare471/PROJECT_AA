import * as React from 'react'

export const lazy = <T extends Record<string, any>>(loader: () => Promise<T>, name: keyof T) =>
	React.lazy(async () => {
		const module = await loader()
		return { default: module[name] }
	})
