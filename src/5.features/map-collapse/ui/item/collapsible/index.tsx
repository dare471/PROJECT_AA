import { MapCollapseItem } from '..'
import { FC, useEffect, useState } from 'react'
import useCollapse from 'react-collapsed'
import { useQueryParam } from 'use-query-params'
import { Load } from '@/7.shared/ui'
import { ICollapsibleProps } from './types'
import { CollapseButton } from '../button'

export const CollapsibleItem: FC<ICollapsibleProps> = ({
	data,
	isExpanded,
	setIsExpanded,
	onClick,
	listIllustrate,
	setListIllustrate
}) => {
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [illustrateDataQP] = useQueryParam(`${data.type}`)

	const config = {
		duration: 500
	}
	const { getToggleProps, getCollapseProps } = useCollapse({
		isExpanded: isExpanded,
		...config
	})

	useEffect(() => {
		if (isExpanded && illustrateDataQP !== data.KATO) {
			setIsLoad(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrateDataQP])

	useEffect(() => {
		if (illustrateDataQP === data.KATO && listIllustrate === data.type) {
			setIsLoad(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listIllustrate, illustrateDataQP])

	useEffect(() => {
		if (listIllustrate === 'region' && data?.children && illustrateDataQP === data.KATO) {
			setIsLoad(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.children])

	const handleClickExpand = async (e: any) => {
		if (!isExpanded) {
			onClick()
		}
		if (!isLoad) {
			setIsExpanded(prev => !prev)
		}
	}

	return (
		<>
			<CollapseButton
				data={data}
				isExpanded={isExpanded}
				getToggleProps={getToggleProps}
				handleClickExpand={handleClickExpand}
			/>
			<article className='map_collapse_article' {...getCollapseProps()}>
				{data?.children && (
					<ul className='map_collapse_ul_children'>
						{data?.children.map((item: any, index: number) => (
							<MapCollapseItem
								key={`${item}-${index}`}
								data={item}
								listIllustrate={listIllustrate}
								setListIllustrate={setListIllustrate}
							/>
						))}
					</ul>
				)}
				{isLoad && <Load />}
			</article>
		</>
	)
}
