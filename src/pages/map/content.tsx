import { useEvent, useStore } from 'effector-react'
import { useEffect } from 'react'
import styled from 'styled-components'

import { Map } from '~src/widgets/map'

import { ContentTemp } from '~src/shared/ui'

import * as model from './model'
import { Sidebar } from './sidebar'

export const MapPageContent = () => {
	const handlePageMounted = useEvent(model.mapPageMounted)
	const sidebarIsOpen = useStore(model.$sidebarIsActive)

	useEffect(() => {
		handlePageMounted()
	}, [])

	return (
		<ContentTemp.Article>
			<Content data-sidebar={sidebarIsOpen}>
				<Sidebar />
				<Map />
			</Content>
		</ContentTemp.Article>
	)
}

const Content = styled.div<{ 'data-sidebar': boolean }>`
	display: flex;
	flex: 1 0 auto;
	width: 100%;

	position: relative;

	transition: padding 0.3s ease;
	background-color: rgb(184, 211, 245);

	&[data-sidebar='true'] {
		padding-left: 30rem;
	}
`
