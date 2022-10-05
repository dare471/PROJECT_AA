import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Load } from '@/shared/ui'

export const withRouter = (Component: any) => () =>
	(
		<BrowserRouter>
			<Suspense fallback={<Load />}>
				<Component />
			</Suspense>
		</BrowserRouter>
	)
