import { Model, modelView } from 'effector-factorio'
import { useUnit } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { Portal } from '~src/shared/ui/atoms/portal'

import { modalFactory } from './model'

interface Props {
	model: Model<typeof modalFactory>
	children: React.ReactNode
}

export const Modal = modelView(modalFactory, ({ model, children }: Props) => {
	const [open, handleClick] = useUnit([model.$open, model.closeClicked])

	if (!open) return null

	return (
		<Portal className='root-modal'>
			<StyledOverlay>
				<StyledModal>
					{children}
					<CloseButton onClick={() => handleClick()} />
				</StyledModal>
			</StyledOverlay>
		</Portal>
	)
})

const StyledOverlay = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15000;

	background: rgba(0, 0, 0, 0.6);
`

const StyledModal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 15000;

	background: var(${theme.palette.bnw950});
	border-radius: ${theme.spacing(1)};

	padding: 3rem;
	transform: translate(-50%, -50%);
`

const CloseButton = styled.span`
	position: absolute;
	top: 1rem;
	right: 1rem;

	width: 1rem;
	height: 1rem;

	cursor: pointer;

	&:before,
	&:after {
		content: '';
		display: block;

		width: 1.3rem;
		height: 0.2rem;

		background-color: var(${theme.palette.bnw50});
		border-radius: ${theme.spacing(1)};
		position: absolute;
		top: calc(50% - 0.1rem);
		left: calc(50% - 0.5rem);

		transform: rotate(45deg);
	}

	&:after {
		transform: rotate(135deg);
	}
`
