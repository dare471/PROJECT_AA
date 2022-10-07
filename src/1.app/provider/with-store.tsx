import { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/7.shared/lib'

export const withStore =
	(Component: FC): FC =>
	props =>
		(
			<Provider store={store}>
				<Component {...props} />
			</Provider>
		)
