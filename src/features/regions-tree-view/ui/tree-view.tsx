import { Stack } from '@chakra-ui/react'
import { useUnit } from 'effector-react'

import type { createRegionsTreeView } from '../model'
import { RegionsTreeNode } from './tree-node'

interface RegionsTreeViewProps {
	model: ReturnType<typeof createRegionsTreeView>
}

export function RegionsTreeView(props: RegionsTreeViewProps) {
	const { model } = props
	const [treeView, handleNodeClick] = useUnit([model.$treeView, model.nodeClicked])

	return (
		<Stack>
			{treeView.map((node) => (
				<RegionsTreeNode key={node.id} node={node} onClick={handleNodeClick} />
			))}
		</Stack>
	)
}
