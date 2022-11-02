import { ReactNode, Suspense } from 'react'

import { Load } from '../load'

type LazyProps = {
	content: ReactNode
	fallback?: ReactNode
}

export const Lazy = ({ content, fallback }: LazyProps) => (
	<Suspense fallback={fallback ? <Load /> : fallback}>{content}</Suspense>
)
