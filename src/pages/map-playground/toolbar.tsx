import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'
import { BsFilter } from 'react-icons/all'
import styled from 'styled-components'

import { theme } from '~src/shared/lib'
import { Button, CreateSelect } from '~src/shared/ui'

import * as model from './model'

const toolbarButtonClicked = createEvent<void>()

const $toolbarOpen = createStore<boolean>(false)

$toolbarOpen.on(toolbarButtonClicked, (prev) => !prev)

export const MapPlayGroundToolbar = () => {
	const [toolbarOpen, handleClick] = useUnit([$toolbarOpen, toolbarButtonClicked])
	const [culturesPending, regionsPending] = useUnit([
		model.landModel.getRegionCulturesFx.pending,
		model.landModel.getRegionsFx.pending
	])

	return (
		<Container>
			<ToolbarItemGroup>
				<ToolbarItem style={{ flexGrow: 0 }} data-group data-active={toolbarOpen}>
					<RegionSelect isLoading={regionsPending} model={model.regionsSelectModel} />
				</ToolbarItem>
				<ToolbarItem data-group data-active={toolbarOpen}>
					<RegionCulturesSelect
						isMulti
						closeMenuOnSelect={false}
						isLoading={culturesPending}
						model={model.regionCulturesSelectModel}
					/>
				</ToolbarItem>
			</ToolbarItemGroup>
			<ToolbarButton onClick={() => handleClick()}>
				<BsFilter />
			</ToolbarButton>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
`

const ToolbarItem = styled.div<{ 'data-active': boolean; 'data-group': boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: var(${theme.palette.primary600});
	border-radius: ${theme.spacing(1)};
	box-shadow: ${theme.shadow.bnw[1]};

	transition: opacity 0.3s linear, transform 0.3s linear;

	padding: 1rem;

	&[data-active='false'] {
		transform: translateY(-20px);
		opacity: 0;
	}

	&[data-group='false'] {
		position: absolute;
		top: 1rem;
		right: 5.5rem;
		z-index: 10000;
	}
`

const ToolbarItemGroup = styled.div`
	display: flex;
	flex-grow: 0;
	flex-shrink: 0;
	gap: 1rem;

	position: absolute;
	top: 1rem;
	right: 5.5rem;
	z-index: 10000;
`

const ToolbarButton = styled(Button)`
	position: absolute;
	top: 1rem;
	right: 1rem;
	z-index: 10000;

	font-size: 1.1rem;

	box-shadow: ${theme.shadow.bnw[1]};
`

const RegionSelect = styled(CreateSelect.Select)`
	min-width: 200px;
	max-width: 400px;

	margin-right: 1rem;
`

const RegionCulturesSelect = styled(CreateSelect.Select)`
	min-width: 200px;
	max-width: 400px;
`
