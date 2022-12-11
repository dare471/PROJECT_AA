import React from 'react'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { Input } from '~src/shared/ui'
import { LabelVariant } from '~src/shared/ui/atoms/label'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	labelType?: LabelVariant
}

export const Switch = ({ title, id, labelType = 'inline', ...props }: Props) => {
	return (
		<Container>
			{title && <label htmlFor={id}>{title}</label>}
			<SwitchStyled type='checkbox' {...props} />
		</Container>
	)
}

const Container = styled.div``

const SwitchStyled = styled(Input)`
	--size: 30px;
	--ball-size: 30%;
	--ball-padding: 5px;
	--ball-bg-color: var(${theme.palette.primary600});
	--ball-border-color: var(${theme.palette.primary800});

	width: calc(var(--size) * 2);
	height: var(--size);

	background-color: var(${theme.palette.bnw900});
	border: 1px solid var(${theme.palette.primary900});
	border-radius: 1rem;
	cursor: pointer;

	position: relative;

	padding: 0 10px;

	&[type='checkbox'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		-o-appearance: none;
		appearance: none;
	}

	&:checked {
		background-color: var(${theme.palette.primary200});

		&:before {
			left: calc(100% - var(--ball-padding));

			transform: translateY(-50%) translateX(-100%);
		}
	}

	&:before {
		content: '';
		display: block;
		width: var(--ball-size);
		height: calc(var(--ball-size) * 2);

		background-color: var(--ball-bg-color);
		border: 1px solid var(--ball-border-color);
		border-radius: 50%;

		position: absolute;
		top: 50%;
		left: 5px;

		transition: all 0.1s linear;

		transform: translateY(-50%);
	}
`
