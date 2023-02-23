import { createEvent, sample } from 'effector'
import { useUnit } from 'effector-react'
import { interval } from 'patronum'
import React from 'react'

import { withProviders } from '~src/app/providers'

import { Pages } from '~src/pages'

import { sessionModel } from '~src/entities/session'

import './index.scss'

const appMounted = createEvent<void>()
const appUnmounted = createEvent<void>()

const { tick } = interval({
	start: appMounted,
	timeout: 2000,
	stop: appUnmounted,
})

sample({
	clock: tick,
	target: sessionModel.getSessionHookFx,
})

export function App() {
	const [handleMount, handleUnmount] = useUnit([appMounted, appUnmounted])

	React.useEffect(() => {
		handleMount()

		return () => {
			handleUnmount()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Pages />
		</>
	)
}

export default withProviders(App)
