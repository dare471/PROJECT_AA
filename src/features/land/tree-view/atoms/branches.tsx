import styled from 'styled-components'

import type { Branch } from '../model'
import { LandBranch } from './branch'

interface Props {
	branches: Branch[]
}

export const LandsBranches = ({ branches }: Props) => {
	return (
		<Container>
			{branches.map((branch, index) => (
				<LandBranch key={index} branch={branch} />
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
	gap: 0.15rem;
`
