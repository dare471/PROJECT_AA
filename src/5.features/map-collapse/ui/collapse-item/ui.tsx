import { FC, memo, useEffect, useState } from 'react'
import useCollapse from 'react-collapsed'
import { useMapQP } from '@/5.features/map/lib'
import { useQP } from '@/7.shared/lib'
import { Button, Load } from '@/7.shared/ui'
import { IMapCollapseItemProps } from './types'
import './styles.scss'

export const MapCollapseItem: FC<IMapCollapseItemProps> = memo(
	({ data, illustrate }) => {
		const [isLoad, setIsLoad] = useState<boolean>(false)
		const [isExpanded, setIsExpanded] = useState<boolean>(false)

		const { setIllustrateDataQP } = useMapQP()
		const { getQP } = useQP()
		const dataParam = getQP(data.type)
		const illustrateDataQP = getQP(illustrate)

		const config = {
			duration: 500
		}
		const { getToggleProps, getCollapseProps } = useCollapse({
			isExpanded: isExpanded,
			...config
		})

		useEffect(() => {
			if (isExpanded && dataParam !== data.KATO) {
				setIsExpanded(false)
				setIsLoad(false)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [dataParam])

		useEffect(() => {
			if (dataParam === data.KATO && illustrate === data.type) {
				setIsLoad(true)
				setIsExpanded(true)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [illustrate, illustrateDataQP])

		useEffect(() => {
			if (data?.children && dataParam === data.KATO) {
				setIsLoad(false)
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [data?.children])

		const handleClickExpand = async (e: any) => {
			const target = e.target
			if (target.classList.contains('map_collapse_header_button')) {
				if (!isExpanded && !data?.children) {
					const type = data.type
					const id = data.KATO

					setIllustrateDataQP(type, id)
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
							boxShadow={false}
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
				{data.type === 'region' && (
					<article className='map_collapse_article' {...getCollapseProps()}>
						{data?.children && (
							<ul className='map_collapse_ul_children'>
								{data?.children.map((item: any, index: number) => (
									<MapCollapseItem key={`${item}-${index}`} data={item} illustrate={illustrate} />
								))}
							</ul>
						)}
						{isLoad && <Load />}
					</article>
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
