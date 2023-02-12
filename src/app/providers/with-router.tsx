import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { FullSpinner } from '~src/shared/ui'

export const withRouter = (component: () => React.ReactNode) => () =>
	(
		<BrowserRouter>
			<React.Suspense fallback={<FullSpinner />}>{component()}</React.Suspense>
		</BrowserRouter>
	)
