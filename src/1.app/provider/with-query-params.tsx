import { FC } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

export const withQueryParams =
	(Component: FC): FC =>
	props =>
		(
			<QueryParamProvider adapter={ReactRouter6Adapter}>
				<Component {...props} />
			</QueryParamProvider>
		)
