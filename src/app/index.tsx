import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

import { withProviders } from '~src/app/providers'

import { Pages } from '~src/pages'

import { breakpoints } from '~src/shared/lib'
import { customProps } from '~src/shared/lib/theme'

const GlobalStyle = createGlobalStyle`
	html, body, #app, #app > section {
		height: 100%;
	}

	html {
		font-size: 16px;

		${breakpoints.devices.tablet} {
			font-size: 80%;
		}
	}

	body {
		margin: 0;
		overflow: hidden;
		padding: 0;
		font-family: 'TT Hoves', sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	${normalize}
	${customProps}
`

function App() {
	return (
		<>
			<GlobalStyle />
			<Pages />
		</>
	)
}

export default withProviders(App)
