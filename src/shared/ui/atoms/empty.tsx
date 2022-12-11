import React from 'react'
import styled from 'styled-components'

import { Text } from './text'

interface EmptySearchProps {
	text: string
	children?: React.ReactNode
}

export const Empty: React.FC<EmptySearchProps> = ({ text, children }) => {
	return (
		<EmptyBlock>
			<Text>{text}</Text>
			{children}
		</EmptyBlock>
	)
}

const EmptyBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	margin-top: 15%;
`
