import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

import { breakpoints } from '~src/shared/lib'

type TSubComponents = {
	Content: typeof Content
	Header: typeof Header
	Footer: typeof Footer
}

const Split: FC<PropsWithChildren> & TSubComponents = ({ children }) => {
	return <Container>{children}</Container>
}

const Container = styled.section`
	display: flex;
	flex-direction: column;
	height: 100%;

	${breakpoints.devices.mobile} {
		overflow-y: auto;
	}
`

const Content = styled.article`
	flex-grow: 1;
	overflow-y: auto;
	padding-top: 1.875rem;

	${breakpoints.devices.mobile} {
		overflow: unset;
	}
`

const Header = styled.div`
	height: auto;
`
const Footer = styled.div`
	flex-shrink: 1;
`

Split.Content = Content
Split.Header = Header
Split.Footer = Footer

export { Split }
