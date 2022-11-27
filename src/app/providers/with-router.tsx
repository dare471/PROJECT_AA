import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Spin } from '~src/shared/ui'

export const withRouter = (component: () => ReactNode) => () =>
	(
		<BrowserRouter>
			<Suspense fallback={<Spin />}>{component()}</Suspense>
		</BrowserRouter>
	)
