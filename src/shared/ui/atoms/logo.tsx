import React from 'react'
import styled from 'styled-components'

import { AlemAgroLogo } from '~src/shared/assets'

export const Logo = () => {
	return (
		<IconWrapper>
			<img src={AlemAgroLogo} alt='logo' data-icon='text' />
		</IconWrapper>
	)
}

const IconWrapper = styled.div`
	display: flex;
	align-items: baseline;

	[data-icon='text'] {
		height: 35px;
		margin-left: 10px;
	}

	[data-icon='square'] {
		height: 25px;
		width: 25px;
		border-radius: 3px;

		& rect {
			fill: #683aef;
		}
	}
`
