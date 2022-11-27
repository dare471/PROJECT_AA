import * as React from 'react'
import styled from 'styled-components'

import { breakpoints } from '~src/shared/lib'

type ContentCenterProps = {
	children: React.ReactNode
}

function Center({ children }: ContentCenterProps) {
	return (
		<CenterContainer>
			<CenterContent>{children}</CenterContent>
		</CenterContainer>
	)
}

const CenterContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`

const CenterContent = styled.div`
	//width: 1404px;
	width: 100%;
	max-width: 100%;
	padding: 0 36px;

	${breakpoints.devices.tablet} {
		padding: 0 30px;
	}

	${breakpoints.devices.mobile} {
		padding: 0 18px;
	}
`

const Main = styled.main`
	display: flex;
	flex-shrink: 0;
	width: 100%;
	height: 100vh;

	padding-top: 72px;
`

export const ContentTemp = { Center, Main }
