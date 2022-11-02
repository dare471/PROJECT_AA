import { ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor } from '@/7.shared/lib/redux'

export const withReduxPersist = (component: () => ReactNode) => () =>
	(
		<PersistGate loading={null} persistor={persistor}>
			{component()}
		</PersistGate>
	)
