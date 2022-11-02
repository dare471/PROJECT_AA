import { memo, useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'

import { TSetState } from '@/7.shared/lib/react'
import { Collapse } from '@/7.shared/ui'

import { TListIllustrate, TListPolygons } from '..'
import { CollapseButton } from './button'
import { CollapsibleItem } from './collapsible'
import './styles.scss'

type TDescribePolygonCollapseProps = {
	data: TListPolygons
	listIllustrate?: TListIllustrate
	setListIllustrate: TSetState<TListIllustrate | undefined>
}

export const DescribePolygonCollapse = memo((props: TDescribePolygonCollapseProps) => {
	const { data, listIllustrate, setListIllustrate } = props

	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const [illustrateDataQP, setIllustrateDataQP] = useQueryParam(`${data.type}`)
	const [districtQP, setDistrictQP] = useQueryParam('district')
	const [clientPolygonsQP, setClientPolygonsQP] = useQueryParam('clientPolygons')
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon')

	useEffect(() => {
		if (illustrateDataQP === data.cato && listIllustrate === data.type) {
			setIsExpanded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listIllustrate, illustrateDataQP])

	useEffect(() => {
		if (isExpanded && illustrateDataQP !== data.cato) {
			setIsExpanded(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrateDataQP])

	const handleClickRegion = () => {
		const type = data.type as TListIllustrate
		const id = data.cato

		setDistrictQP(null)
		setClientPolygonsQP(null)
		setClientPolygonQP(null)
		setIllustrateDataQP(id)
		setListIllustrate(type)
	}

	const handleClickDistrict = () => {
		const type = data.type as TListIllustrate
		const id = data.cato

		setClientPolygonsQP(null)
		setClientPolygonQP(null)
		if (!isExpanded) {
			setIllustrateDataQP(id)
			setListIllustrate(type)
		}

		setIsExpanded(prev => !prev)
	}

	return (
		<li className={`map_collapse_li${data.type === 'district' ? ' children' : ''}`}>
			{data.type === 'region' && (
				<CollapsibleItem
					data={data}
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
					listIllustrate={listIllustrate}
					setListIllustrate={setListIllustrate}
					onClick={handleClickRegion}
				/>
			)}
			{data.type === 'district' && (
				<Collapse
					label={data.name}
					isExpandedCustom={isExpanded}
					onClick={handleClickDistrict}
					CustomButton={({ getToggleProps, isExpanded, label, onClick }) => (
						<CollapseButton
							getToggleProps={getToggleProps}
							isExpanded={isExpanded}
							label={label}
							onClick={onClick}
							type={data.type as TListIllustrate}
						/>
					)}
					children
				/>
			)}
		</li>
	)
})
