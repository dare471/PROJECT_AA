import { withProviders } from '~src/app/providers'

import { Pages } from '~src/pages'

export function App() {
	return (
		<>
			<Pages />
		</>
	)
}

export default withProviders(App)
