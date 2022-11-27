import { Footer } from '~src/widgets/footer'
import { Header } from '~src/widgets/header'

import { Split } from '~src/shared/ui'

import { MapPageContent } from './content'

export function MapPage() {
	return (
		<Split>
			<Split.Header>
				<Header />
			</Split.Header>
			<Split.Content>
				<MapPageContent />
			</Split.Content>
			<Split.Footer>
				<Footer />
			</Split.Footer>
		</Split>
	)
}
