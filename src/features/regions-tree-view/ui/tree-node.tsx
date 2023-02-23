import { Box, Button, Stack } from '@chakra-ui/react'

import { type Node } from '../model'

interface RegionsTreeNodeProps {
	node: Node
	onClick: (node: Node) => void
}

export function RegionsTreeNode(props: RegionsTreeNodeProps) {
	const { node, onClick } = props

	if (node.type === 'district') {
		return (
			<Button
				w='full'
				justifyContent='start'
				variant='outline'
				isLoading={node.loading}
				data-type={node.type}
				onClick={() => onClick(node)}
			>
				{node.name}
			</Button>
		)
	}

	if (!node.childNodes) {
		return (
			<Box>
				<Button
					w='full'
					variant='outline'
					data-type={node.type}
					isLoading={node.loading}
					isActive={node.active}
					onClick={() => onClick(node)}
				>
					{node.name}
				</Button>
			</Box>
		)
	}

	return (
		<Box>
			<Button w='full' data-type={node.type} isActive={node.active} onClick={() => onClick(node)}>
				{node.name}
			</Button>
			<Stack>
				{node.childNodes.map((childNode) => (
					<RegionsTreeNode key={childNode.id} node={childNode} onClick={onClick} />
				))}
			</Stack>
		</Box>
	)
}
