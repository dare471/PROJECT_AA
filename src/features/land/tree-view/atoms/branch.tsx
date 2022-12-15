import { useUnit } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import { LandsBranches } from '~src/features/land/tree-view/atoms/branches'
import { landTreeViewFactory } from '~src/features/land/tree-view/new-model'

import { theme } from '~src/shared/lib'
import { Button } from '~src/shared/ui'

import type { Branch } from '../model'

interface Props {
	branch: Branch
}

export const LandBranch = ({ branch }: Props) => {
	const model = landTreeViewFactory.useModel()

	const { handleClick } = useUnit({ handleClick: model.branchClicked })

	const onClick = () => handleClick(branch)

	if (branch.type === 'district') {
		return (
			<BranchButton
				hoverable
				variant='outlined'
				isLoading={branch.loading}
				data-type={branch.type}
				onClick={onClick}
			>
				{branch.name}
				{branch.loading && 'loading'}
			</BranchButton>
		)
	}

	if (!branch.childBranch) {
		return (
			<Container>
				<CollapsedButton
					hoverable
					variant='outlined'
					isLoading={branch.loading}
					data-type={branch.type}
					data-active={branch.active}
					onClick={onClick}
				>
					{branch.name}
				</CollapsedButton>
			</Container>
		)
	}

	return (
		<Container>
			<CollapsedButton data-type={branch.type} data-active={branch.active} onClick={onClick}>
				{branch.name}
			</CollapsedButton>
			<Content>
				<LandsBranches branches={branch.childBranch} />
			</Content>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const Content = styled.div`
	display: flex;
	flex: 1 0 auto;
	padding-left: 20px;
	margin-top: 5px;
	margin-bottom: 10px;

	position: relative;

	&:before {
		content: '';
		width: 4px;
		height: 100%;

		position: absolute;
		top: 50%;
		left: 10px;

		transform: translateY(-50%) translateX(-50%);
		background-color: var(${theme.palette.primary900});
		border-radius: 0.5rem;
	}
`

const CollapsedButton = styled(Button)<{ 'data-active': boolean }>`
	position: relative;
	justify-content: flex-start;

	&:before,
	&:after {
		content: '';
		display: block;
		width: 10px;
		height: 2px;

		background-color: var(--base-color-600);

		position: absolute;
		top: 50%;
		right: 10px;
	}

	&:after {
		transform: rotate(90deg);
	}

	&[data-active='true'] {
		&[data-loading='false'] {
			&:before {
				background-color: var(${theme.palette.bnw950});
			}

			&:after {
				display: none;
			}
		}
	}
`

const BranchButton = styled(Button)`
	justify-content: flex-start;
`
