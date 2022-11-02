import { ReactNode } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

export const withQueryParams = (component: () => ReactNode) => () =>
	<QueryParamProvider adapter={ReactRouter6Adapter}>{component()}</QueryParamProvider>
