import { lazy, useState } from 'react'

export const useVisibility = (initialVisible = false) => {
	const [visible, setVisible] = useState(initialVisible)
	return {
		visible,
		close: () => setVisible(false),
		open: () => setVisible(true)
	}
}

export const namedLazy = <T extends Record<string, any>>(loader: () => Promise<T>, name: keyof T) =>
	lazy(async () => {
		const module = await loader()
		return { default: module[name] }
	})
