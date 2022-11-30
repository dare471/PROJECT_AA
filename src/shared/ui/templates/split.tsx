import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

type ContentVariant = 'full' | 'fit' | 'position-full' | 'position-fit'
type HeaderVariant = 'block' | 'absolute' | 'fixed' | 'sticky'

type SubComponents = {
	Content: typeof Content
	Header: typeof Header
	Footer: typeof Footer
}

interface HeaderProps {
	children: React.ReactNode
	variant?: HeaderVariant
}

interface ContentProps {
	children: React.ReactNode
	variant?: ContentVariant
}

const Split: FC<PropsWithChildren> & SubComponents = ({ children }) => {
	return <Container>{children}</Container>
}

const Header = ({ variant = 'block', children }: HeaderProps) => {
	return <StyledHeader data-variant={variant}>{children}</StyledHeader>
}

const Content = ({ variant = 'full', children }: ContentProps) => {
	return <StyledContent data-variant={variant}>{children}</StyledContent>
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100%;

	overflow-y: auto;
`

//FIXME: change 72px to var(--header-height)
const StyledContent = styled.section<{ 'data-variant': ContentVariant }>`
	flex: 1 0 auto;

	&[data-variant='full'] {
		min-height: calc(100% - 72px);
	}

	&[data-variant='position-full'] {
		min-height: 100%;

		padding-top: 72px;
	}

	&[data-variant='position-fit'] {
		height: auto;

		padding-top: 72px;
	}

	&[data-variant='fit'] {
		height: auto;
	}
`

//FIXME: change z-index: 10000 to var(--z-index-header)
const StyledHeader = styled.div<{ 'data-variant': HeaderVariant }>`
	--z-index-header: 10000;

	width: 100%;
	flex-shrink: 0;

	&[data-variant='block'] {
		display: block;
	}

	&[data-variant='absolute'] {
		position: absolute;
		top: 0;
		left: 0;
		z-index: var(--z-index-header);
	}

	&[data-variant='fixed'] {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--z-index-header);
	}

	&[data-variant='sticky'] {
		position: sticky;
		top: 0;
		left: 0;
		z-index: var(--z-index-header);
	}
`
const Footer = styled.div`
	flex-shrink: 0;
`

Split.Content = Content
Split.Header = Header
Split.Footer = Footer

export { Split }
