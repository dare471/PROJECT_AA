import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/7.shared/lib/redux'

export const withStore = (component: () => ReactNode) => () => <Provider store={store}>{component()}</Provider>
