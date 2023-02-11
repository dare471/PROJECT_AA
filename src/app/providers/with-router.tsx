import * as React from 'react'
import { Center, Spinner } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component: () => React.ReactNode) => () =>
	(
		<BrowserRouter>
			<React.Suspense
				fallback={
					<Center h='100vh'>
						<Spinner size='lg' color='blue.500' />
					</Center>
				}
			>
				{component()}
			</React.Suspense>
		</BrowserRouter>
	)
