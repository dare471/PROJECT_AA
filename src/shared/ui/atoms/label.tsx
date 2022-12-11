import React from 'react'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'

export type LabelVariant = 'block' | 'inline'

interface Props {
	type?: LabelVariant
	children: React.ReactNode
	bgVisible: boolean
}

export const LabelWrapper = ({ type = 'block', bgVisible, children }: Props) => {
	return (
		<LabelStyled data-type={type} data-bg={bgVisible}>
			{children}
		</LabelStyled>
	)
}

const LabelStyled = styled.div<{ 'data-type': LabelVariant; 'data-bg': boolean }>`
	--bg-color: var(${theme.palette.primary600});

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 0.5rem;

	color: var(${theme.palette.bnw950});

	&[data-type='inline'] {
		flex-direction: row-reverse;
		gap: 0.5rem;
	}

	&[data-bg='true'] {
		background-color: var(--bg-color);
		box-shadow: ${theme.shadow.primary[1]};
		border: 1px solid var(--bg-color);
		border-radius: 0.5rem;
	}
`
