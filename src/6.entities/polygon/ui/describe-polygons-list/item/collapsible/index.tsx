import { memo, useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'

import { TSetState } from '@/7.shared/lib/react'
import { Collapse, Load } from '@/7.shared/ui'

import { DescribePolygonCollapse } from '..'
import { TListIllustrate, TListPolygons } from '../..'
import { CollapseButton } from '../button'
import './styles.scss'

type TCollapsibleProps = {
	data: TListPolygons
	isExpanded: boolean
	setIsExpanded: TSetState<boolean>
	onClick: () => void
	listIllustrate?: TListIllustrate
	setListIllustrate: TSetState<TListIllustrate | undefined>
}

export const CollapsibleItem = memo((props: TCollapsibleProps) => {
	const { data, isExpanded, setIsExpanded, onClick, listIllustrate, setListIllustrate } = props

	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [illustrateDataQP] = useQueryParam(`${data.type}`)

	useEffect(() => {
		if (isExpanded && illustrateDataQP !== data.cato) {
			setIsLoad(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrateDataQP])

	useEffect(() => {
		if (data?.children && illustrateDataQP === data.cato) {
			setIsLoad(false)
		} else {
			setIsLoad(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.children, illustrateDataQP])

	const handleClickExpand = async (e: any) => {
		if (!isExpanded) {
			onClick()
		}
		if (!isLoad) {
			setIsExpanded(prev => !prev)
		}
	}

	return (
		<Collapse
			label={data.name}
			CustomButton={({ getToggleProps, isExpanded, label, onClick }) => (
				<CollapseButton
					getToggleProps={getToggleProps}
					isExpanded={isExpanded}
					label={label}
					onClick={onClick}
					type={data.type as TListIllustrate}
				/>
			)}
			isExpandedCustom={isExpanded}
			onClick={handleClickExpand}
		>
			{data?.children && (
				<article className='map_collapse_article'>
					<ul className='map_collapse_ul_children'>
						{data.children.map((item: any, index: number) => (
							<DescribePolygonCollapse
								key={`${item}-${index}`}
								data={item}
								listIllustrate={listIllustrate}
								setListIllustrate={setListIllustrate}
							/>
						))}
					</ul>
				</article>
			)}
			{isLoad && <Load />}
		</Collapse>
	)
})
