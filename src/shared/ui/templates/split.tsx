import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

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

	overflow-y: auto;
`

const Content = styled.article`
	flex: 1 0 auto;
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
