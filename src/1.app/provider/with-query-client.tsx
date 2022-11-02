import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const withQueryClient = (component: () => ReactNode) => () =>
	<QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
