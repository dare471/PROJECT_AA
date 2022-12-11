import styled from 'styled-components'

import { theme } from '~src/shared/lib'

export const Input = styled.input`
	flex-grow: 1;
	flex-shrink: 0;

	background-color: var(${theme.palette.bnw950});
	border: 1px solid var(${theme.palette.bnw750});
	border-radius: ${theme.spacing(1.5)};

	font-size: 0.9375rem;

	outline: 0;
	padding: 0 1.125rem;

	&::placeholder {
		color: var(${theme.palette.bnw550});
	}

	&:disabled {
		background-color: var(${theme.palette.bnwDisabled});
		cursor: not-allowed;
	}
`
