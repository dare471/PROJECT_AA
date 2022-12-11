import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { theme } from '~src/shared/lib'

type ButtonVariant = 'text' | 'outlined' | 'solid'
type ButtonTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: ButtonTheme
	variant?: ButtonVariant
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	isLoading?: boolean
	isCompleted?: boolean
	center?: boolean
	hoverable?: boolean
	activable?: boolean
	focusable?: boolean
	focusEffect?: boolean
}

export const Button = React.forwardRef(function Button(
	{
		theme = 'primary',
		variant = 'solid',
		startIcon,
		endIcon,
		type,
		center = false,
		isLoading = false,
		isCompleted = false,
		hoverable = false,
		activable = false,
		focusable = false,
		children,
		...props
	}: Props,
	ref: React.Ref<HTMLButtonElement>
) {
	return (
		<ButtonStyled
			data-theme={theme}
			data-variant={variant}
			data-squared={Boolean(startIcon && endIcon && !children)}
			data-center={center}
			data-completed={isCompleted}
			data-loading={isLoading}
			data-hoverable={hoverable}
			data-activable={activable}
			data-focusable={focusable}
			type={type}
			as={(variant === 'text' ? 'a' : 'button') as any}
			ref={ref}
			{...props}
		>
			{startIcon && <span>{startIcon}</span>}
			{children && <span>{children}</span>}
			{endIcon && <span>{endIcon}</span>}
		</ButtonStyled>
	)
})

const buttonCustomProps = css`
	--base-color-500: var(${theme.palette.primary500});
	--base-color-600: var(${theme.palette.primary600});
	--base-color-1000: var(${theme.palette.primary1000});
	--base-color-hover: var(${theme.palette.primaryHover});
	--box-shadow-0: ${theme.shadow.primary[0]};
	--box-shadow-1: ${theme.shadow.primary[1]};
	--text-color: var(${theme.palette.bnw950});
	--padding: 0.125rem 1.275rem;
	--font-size: 1rem;
	--font-weight: 500;
	--border-radius: ${theme.spacing(1)};
`

const buttonTheme = css`
	&[data-theme='primary'] {
		--base-color-500: var(${theme.palette.primary500});
		--base-color-600: var(${theme.palette.primary600});
		--base-color-1000: var(${theme.palette.primary1000});
		--base-color-hover: var(${theme.palette.primaryHover});
		--box-shadow-0: ${theme.shadow.primary[0]};
		--box-shadow-1: ${theme.shadow.primary[1]};
	}

	&[data-theme='secondary'] {
		--base-color-500: var(${theme.palette.secondary500});
		--base-color-600: var(${theme.palette.secondary600});
		--base-color-1000: var(${theme.palette.secondary1000});
		--base-color-hover: var(${theme.palette.secondaryHover});
		--box-shadow-0: ${theme.shadow.secondary[0]};
		--box-shadow-1: ${theme.shadow.secondary[1]};
	}

	&[data-theme='danger'] {
		--base-color-500: var(${theme.palette.danger500});
		--base-color-600: var(${theme.palette.danger600});
		--base-color-1000: var(${theme.palette.danger1000});
		--base-color-hover: var(${theme.palette.dangerHover});
		--box-shadow-0: ${theme.shadow.danger[0]};
		--box-shadow-1: ${theme.shadow.danger[1]};
	}

	&[data-theme='success'] {
		--base-color-500: var(${theme.palette.success500});
		--base-color-600: var(${theme.palette.success600});
		--base-color-1000: var(${theme.palette.success1000});
		--base-color-hover: var(${theme.palette.successHover});
		--box-shadow-0: ${theme.shadow.success[0]};
		--box-shadow-1: ${theme.shadow.success[1]};
	}

	&[data-theme='warning'] {
		--base-color-500: var(${theme.palette.warning500});
		--base-color-600: var(${theme.palette.warning600});
		--base-color-1000: var(${theme.palette.warning1000});
		--base-color-hover: var(${theme.palette.warningHover});
		--box-shadow-0: ${theme.shadow.warning[0]};
		--box-shadow-1: ${theme.shadow.warning[1]};
	}
`

const buttonVariant = css`
	&[data-variant='outlined'] {
		--text-color: var(--base-color-600);
		background-color: transparent;
		border-color: var(--base-color-600);
	}

	&[data-variant='text'] {
		--text-color: var(--base-color-600);
		background: transparent;
		border-color: transparent;
	}
`

const defaultButton = css`
	all: unset;

	display: inline-flex;
	justify-content: center;
	align-items: center;

	position: relative;
	overflow: hidden;
	cursor: pointer;

	padding: var(--padding);
	color: var(--text-color);
	background-color: var(--base-color-600);
	background-position: center;
	border: 1px solid var(--base-color-600);
	border-radius: var(--border-radius);
	outline: 0;

	font-size: var(--font-size);
	font-family: inherit;
	font-weight: var(--font-weight);
	text-transform: uppercase;
	text-shadow: var(--text-shadow);

	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0.3s, border 0.3s;
	will-change: transform, opacity, background-color;
`

const hoveredButton = css`
	background-color: var(--base-color-hover);
	opacity: 0.95;

	&[data-variant='outlined'],
	&[data-variant='text'] {
		background-color: var(--base-color-1000);
	}
`

const disabledButton = css`
	opacity: 0.5;
	cursor: not-allowed;
`

const activeButton = css`
	transform: scale(0.97);
`

const focusedButton = css`
	box-shadow: var(--box-shadow-1);
`

const completedButton = css`
	background-color: var(${theme.palette.success600});
`

const loadingAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`

const loadingButton = css`
	cursor: wait;

	&:before {
		content: '';
		width: 0.8rem;
		height: 0.8rem;

		position: absolute;
		top: calc(50% - 7.5px);
		right: 7.5px;

		background: transparent;
		border: 2px solid var(--base-color-500);
		border-radius: 50%;
		border-top-color: transparent;
		animation: ${loadingAnimation} 1s linear infinite;
	}

	&:after {
		display: none;
	}
`

const ButtonStyled = styled.button<{
	'data-theme': ButtonTheme
	'data-variant': ButtonVariant
	'data-squared': boolean
	'data-center': boolean
	'data-completed': boolean
	'data-loading': boolean
	'data-hoverable': boolean
	'data-activable': boolean
	'data-focusable': boolean
}>`
	${buttonCustomProps};
	${defaultButton};
	${buttonTheme};
	${buttonVariant};

	span {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	span + span {
		margin-left: 0.5rem;
	}

	&:disabled {
		${disabledButton}
	}

	&[data-activable='true'] {
		&:active {
			${activeButton}
		}
	}

	&[data-hoverable='true'] {
		&[data-loading='false'] {
			&:hover {
				${hoveredButton}
			}
		}
	}

	&[data-focusable='true'] {
		${focusedButton}
	}

	&[data-completed='true'] {
		${completedButton}
	}

	&[data-loading='true'] {
		${loadingButton}
	}

	&[data-squared='true'] {
		width: 48px;
		height: var(--size);
	}

	&[data-center='true'] {
		justify-content: center;
		align-items: center;
	}
`

export const ButtonGroup = styled.div`
	display: flex;

	button + button {
		margin-left: 12px;
	}
`
