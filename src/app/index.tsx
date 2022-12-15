import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

import { withProviders } from '~src/app/providers'

import { Pages } from '~src/pages'

import { breakpoints, paletteProps } from '~src/shared/lib'

import './index.scss'

const GlobalStyle = createGlobalStyle`
	html, body, #app, #app > div {
		height: 100%;
	}

	#app {
	}

	html {
		font-size: 16px;
		scroll-behavior: smooth;

		${breakpoints.devices.tablet} {
			font-size: 90%;
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
	${paletteProps}
`

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Pages />
		</>
	)
}

export default withProviders(App)
