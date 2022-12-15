import { modelView } from 'effector-factorio'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { LandsBranches } from '~src/features/land/tree-view/atoms'
import { landTreeViewFactory } from '~src/features/land/tree-view/new-model'

export const LandsTreeView = modelView(landTreeViewFactory, () => {
	const model = landTreeViewFactory.useModel()
	const treeView = useStore(model.$treeView)

	if (!treeView) return null

	return (
		<Container>
			<LandsBranches branches={treeView}></LandsBranches>
		</Container>
	)
})

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
	height: 100%;

	overflow-y: auto;

	padding: 10px 12px;
`
