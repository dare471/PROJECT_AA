import { Footer } from '~src/widgets/footer'
import { Header } from '~src/widgets/header'

import { Split } from '~src/shared/ui'

import { HomePageContent } from './content'

export function HomePage() {
	return (
		<Split>
			<Split.Header>
				<Header />
			</Split.Header>
			<Split.Content>
				<HomePageContent />
			</Split.Content>
			<Split.Footer>
				<Footer />
			</Split.Footer>
		</Split>
	)
}
