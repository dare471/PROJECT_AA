import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

import { Load } from '@/7.shared/ui'

export const withRouter = (component: () => ReactNode) => () =>
	(
		<BrowserRouter>
			<QueryParamProvider adapter={ReactRouter6Adapter}>
				<Suspense fallback={<Load />}>{component()}</Suspense>
			</QueryParamProvider>
		</BrowserRouter>
	)
