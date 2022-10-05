import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/shared/lib'

export const withStore = (Component: any) => () =>
	(
		<Provider store={store}>
			<Component />
		</Provider>
	)
