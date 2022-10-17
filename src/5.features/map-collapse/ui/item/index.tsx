import { FC, memo, useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'
import { IMapCollapseItemProps } from './types'
import { CollapseButton } from './button'
import { CollapsibleItem } from './collapsible'
import './styles.scss'

export const MapCollapseItem: FC<IMapCollapseItemProps> = memo(({ data, listIllustrate, setListIllustrate }) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const [illustrateDataQP, setIllustrateDataQP] = useQueryParam(`${data.type}`)
	const [districtQP, setDistrictQP] = useQueryParam('district')
	const [clientQP, setClientQP] = useQueryParam('client')
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon')

	// useEffect(() => {
	// 	console.log(`rerender collapse item ${data.KATO}`)
	// }, [])

	useEffect(() => {
		if (illustrateDataQP === data.KATO && listIllustrate === data.type) {
			if (data.type === 'region') {
				console.log(`open ${data.KATO}`)
			}
			setIsExpanded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listIllustrate, illustrateDataQP])

	useEffect(() => {
		if (isExpanded && illustrateDataQP !== data.KATO) {
			if (data.type === 'region') {
				console.log(`close ${data.KATO}`)
			}
			setIsExpanded(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [illustrateDataQP])

	const handleClickRegion = () => {
		const type = data.type
		const id = data.KATO

		setDistrictQP(null)
		setClientQP(null)
		setClientPolygonQP(null)
		setIllustrateDataQP(id)
		setListIllustrate(type)
	}

	const handleClickDistrict = () => {
		const type = data.type
		const id = data.KATO

		setClientQP(null)
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
				<CollapseButton data={data} isExpanded={isExpanded} handleClickExpand={handleClickDistrict} />
			)}
		</li>
	)
})
