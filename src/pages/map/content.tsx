import { useEvent } from 'effector-react'
import { useEffect } from 'react'
import styled from 'styled-components'

import { Map } from '~src/widgets/map'
import { Sidebar } from '~src/widgets/map-sidebar'

import { ContentTemp } from '~src/shared/ui'

import * as model from './model'

export const MapPageContent = () => {
	const handlePageMounted = useEvent(model.mapPageMounted)

	useEffect(() => {
		handlePageMounted()
	}, [])

	return (
		<ContentTemp.Article>
			<Content>
				<Sidebar />
				<Map />
			</Content>
		</ContentTemp.Article>
	)
}

const Content = styled.div`
	display: flex;
	flex: 1 0 auto;
	width: 100%;

	position: relative;
`
