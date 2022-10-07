import { FC, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Load } from '@/7.shared/ui'

export const withRouter =
	(Component: FC): FC =>
	props =>
		(
			<BrowserRouter>
				<Suspense fallback={<Load />}>
					<Component {...props} />
				</Suspense>
			</BrowserRouter>
		)
