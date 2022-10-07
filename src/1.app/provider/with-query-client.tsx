import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const withQueryClient =
	(Component: FC): FC =>
	props =>
		(
			<QueryClientProvider client={queryClient}>
				<Component {...props} />
			</QueryClientProvider>
		)
