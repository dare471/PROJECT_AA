import React from 'react'
import styled from 'styled-components'

import { breakpoints } from '~src/shared/lib'

type MainVariant = 'full' | 'fit'

interface ContentCenterProps {
	children: React.ReactNode
}

interface MainProps {
	children: React.ReactNode
	variant?: MainVariant
	minHeight?: number
}

const Center = ({ children }: ContentCenterProps) => {
	return (
		<CenterContainer>
			<CenterContent>{children}</CenterContent>
		</CenterContainer>
	)
}

const Article = ({ variant = 'full', minHeight = 40, children }: MainProps) => {
	return (
		<StyledArticle data-variant={variant} minHeight={minHeight}>
			{children}
		</StyledArticle>
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

//FIXME: use header-height var from theme
const StyledArticle = styled.main<{ 'data-variant': MainVariant; minHeight: number }>`
	--header-height: 72px;

	display: flex;
	flex: 1 0 auto;
	width: 100%;

	&[data-variant='full'] {
		height: calc(100vh - var(--header-height));
		min-height: ${(props) => props.minHeight}rem;
	}

	&[data-variant='fit'] {
		height: auto;
	}
`

export const ContentTemp = { Center, Article }
