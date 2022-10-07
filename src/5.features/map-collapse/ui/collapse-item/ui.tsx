import { FC, memo, useEffect, useState } from 'react'
import useCollapse from 'react-collapsed'
import { useSearchParams } from 'react-router-dom'
import { Article, Button, Load, Section } from '@/7.shared/ui'
import { IMapCollapseItemProps } from './types'
import './styles.scss'

export const MapCollapseItem: FC<IMapCollapseItemProps> = memo(
	({ data, handleChangeCurrentPolygon }) => {
		const [isLoad, setIsLoad] = useState<boolean>(false)
		const [isExpanded, setIsExpanded] = useState<boolean>(false)
		const [searchParams, setSearchParams] = useSearchParams()
		const dataParam = searchParams.get(data.type)
		const changedParam = searchParams.get('changed')
		const modeParam = searchParams.get('mode')
		const config = {
			duration: 500
		}
		const { getToggleProps, getCollapseProps } = useCollapse({
			isExpanded,
			...config
		})

		useEffect(() => {
			if (dataParam === data.KATO && modeParam === 'true') {
				setIsExpanded(true)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [modeParam])

		useEffect(() => {
			if (isExpanded && dataParam !== data.KATO) {
				setIsExpanded(false)
			} else if (dataParam === data.KATO && !data?.children && changedParam === 'map') {
				setIsExpanded(true)
				setIsLoad(true)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [dataParam])

		useEffect(() => {
			if (data?.children && dataParam === data.KATO) {
				setIsLoad(false)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [data?.children])

		useEffect(() => {
			if ((changedParam === 'map' || changedParam === 'prev') && dataParam === data.KATO) {
				setIsExpanded(true)
				searchParams.delete('changed')
				setSearchParams(searchParams)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [changedParam])

		const handleRequest = async () => {
			setIsLoad(true)
			const type = data.type
			const id = data.KATO
			const res = await handleChangeCurrentPolygon(type, id, ['request'])
			if (!res) {
				setIsLoad(false)
				setIsExpanded(false)
			} else {
				setIsLoad(false)
			}
		}

		const handleClickExpand = async (e: any) => {
			const target = e.target
			if (target.classList.contains('map_collapse_header_button')) {
				if (!isExpanded && !data?.children) {
					handleRequest()
				}
				if (!isLoad) {
					setIsExpanded(prev => !prev)
				}
			}
		}

		return (
			<li className={`map_collapse_li${data.type === 'district' ? ' children' : ''}`}>
				<header className={`map_collapse_header${isExpanded ? ' active' : ''}`}>
					<h6 className='map_collapse_header_title'>{data.NAME || data.TEXT}</h6>

					{(data.type === 'region' || data.type === 'district') && (
						<Button
							{...getToggleProps({ onClick: handleClickExpand })}
							className={`map_collapse_header_button ${
								data.type === 'district' && !isExpanded
									? 'district'
									: data.type === 'district' && isExpanded
									? 'district active'
									: isExpanded
									? 'open'
									: 'close'
							}`}
						></Button>
					)}
				</header>
				{data.type !== 'district' && (
					<Article className='map_collapse_article' {...getCollapseProps()}>
						{data?.children && (
							<ul className='map_collapse_ul_children'>
								{data?.children.map((item: any, index: number) => (
									<MapCollapseItem
										key={`${item}-${index}`}
										data={item}
										handleChangeCurrentPolygon={handleChangeCurrentPolygon}
									/>
								))}
							</ul>
						)}
						{isLoad && <Load />}
					</Article>
				)}
			</li>
		)
	},
	(prevProps, nextProps) => {
		if (typeof prevProps.data?.children === 'undefined' && typeof nextProps.data?.children !== 'undefined') {
			return false
		}

		return true
	}
)
