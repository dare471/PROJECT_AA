import styled from 'styled-components'

import { Roller } from '~src/shared/ui'

interface Props {
	className?: string
}

export const Spin = ({ className }: Props) => {
	return (
		<Container className={className}>
			<Roller />
		</Container>
	)
}

const Container = styled.section`
	display: flex;
	flex: 1 0 auto;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`
