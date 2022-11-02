import { useEffect } from 'react'

export const useTitle = (title: string) => {
	const SITE_PREFIX = 'AlemAgro | '
	useEffect(() => {
		document.title = SITE_PREFIX + title
	}, [title])
}

export const scrollToTop = () => {
	document.querySelector('html')?.scrollTo({ top: 0, behavior: 'smooth' })
}
