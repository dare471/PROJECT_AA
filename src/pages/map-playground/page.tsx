import { Footer } from '~src/widgets/footer'
import { Header } from '~src/widgets/header'

import { Split } from '~src/shared/ui'

import { MapPlayGroundPageContent } from './content'

export const MapPlayGroundPage = () => {
	return (
		<Split>
			<Split.Header>
				<Header />
			</Split.Header>
			<Split.Content>
				<MapPlayGroundPageContent />
			</Split.Content>
			<Split.Footer>
				<Footer />
			</Split.Footer>
		</Split>
	)
}
