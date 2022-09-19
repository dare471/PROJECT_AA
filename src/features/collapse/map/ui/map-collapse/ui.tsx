import { FC, useState } from 'react'
import useCollapse from 'react-collapsed'
import { getDistrictPolygon } from '@/shared/api'
import { IMapCollapseProps } from './types'
import './styles.scss'

export const MapCollapse: FC<IMapCollapseProps> = ({ data, setDistrictPolygons }) => {
	const config = {
		duration: 500
	}
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const { getToggleProps, getCollapseProps } = useCollapse({ isExpanded, ...config })

	const handleClick = async () => {
		if (setDistrictPolygons) {
			const id = data.KATO.slice(0, 2)
			console.log(id)
			const res = await getDistrictPolygon(id)
			setDistrictPolygons((prev: any) => (prev && prev.ID !== res.ID ? { ID: data.ID, data: res } : prev))
		}
		setIsExpanded(prev => !prev)
	}

	return (
		<section className='map_collapse'>
			<header className='map_collapse_header'>
				<h6>{data.NAME || data.TEXT}</h6>
				{data.ID && data.ID < 10000 && (
					<button className='map_collapse_button' {...getToggleProps({ onClick: handleClick })}></button>
				)}
			</header>
			<article {...getCollapseProps()}>
				<div className='content'>
					{data?.children ? (
						<>
							{data?.children.map((item: any, index: number) => (
								<MapCollapse key={`${item}-${index}`} data={item} />
							))}
						</>
					) : null}
				</div>
			</article>
		</section>
	)
}
