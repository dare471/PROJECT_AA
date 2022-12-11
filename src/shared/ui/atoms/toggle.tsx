import React from 'react'
import styled, { css } from 'styled-components'

import { theme } from '~src/shared/lib'
import { Button } from '~src/shared/ui'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
	selected: boolean
	onSelect: () => void
}

export const Toggle = ({ children, onSelect, selected, ...props }: Props) => {
	return (
		<StyledToggle aria-pressed={selected} onClick={onSelect} {...props}>
			{children}
		</StyledToggle>
	)
}

const toggleCustomProps = css`
	//--size: 45px;
	--base-color: var(${theme.palette.primary600});
`

const defaultToggle = css`
	//display: flex;
	//justify-content: center;
	//align-items: center;
	//width: var(--size);
	//height: var(--size);

	background-color: var(--base-color);
`

const StyledToggle = styled(Button)`
	${toggleCustomProps};
	${defaultToggle};

	&[aria-pressed='true'] {
		background-color: var(${theme.palette.primaryPressed});
	}
`
