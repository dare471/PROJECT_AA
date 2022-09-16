import { FC, useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/shared/ui'
import { IMapListRowProps } from './types'
import { DropDown } from '../dropdown/ui'
import './styles.scss'

export const MapListRow: FC<IMapListRowProps> = ({
	data,
	style,
	illustratePolygons,
	activePolygon,
	setInitIndex,
	initIndex,
	index
}) => {
	const [dropdown, setDropdown] = useState<boolean>(false)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (dropdown) {
			console.log(data[index]?.children)
		}
	}, [dropdown])

	const handleKeyUp = (e: any) => {
		e.preventDefault()
		if (e.key === 'Enter') {
			const target = e.target.closest('.map_list_wrapper')
			const id = target.id
			const illustrate = target.dataset.illustrate
			searchParams.set('illustrate', illustrate)
			searchParams.set(illustrate, id)
			setSearchParams(searchParams)
		}
	}

	const handleClick = (e: any) => {
		e.preventDefault()
		const target = e.target.closest('.map_list_wrapper')
		const id = target.id
		const illustrate = target.dataset.illustrate
		searchParams.set('illustrate', illustrate)
		searchParams.set(illustrate, id)
		setSearchParams(searchParams)
	}

	return (
		<Button
			className='map_list_wrapper'
			onClick={!data[index].properties?.TYPE_1 ? handleClick : null}
			onKeyUp={!data[index].properties?.TYPE_1 ? handleKeyUp : null}
			tabIndex={0}
			data-illustrate={data.properties?.TYPE_1 ? 'area' : 'district'}
			id={data[index].properties?.TYPE_1 ? data[index].properties.GID_1 : data[index].properties.GID_2}
			style={style}
		>
			<li className='map_list'>
				<>
					<div className='map_list_content'>
						<span className='map_list_text map_list_text'>
							{index}.{data[index].properties?.TYPE_1 ? data[index].properties.NAME_1 : data[index].properties.NAME_2}
						</span>
						<FiEye
							color={
								(
									data[index].properties?.TYPE_1
										? activePolygon?.properties.GID_1 === data[index].properties.GID_1
										: activePolygon?.properties.GID_2 === data[index].properties.GID_2
								)
									? 'red'
									: 'black'
							}
							className='map_list_eye'
						/>
					</div>
				</>
			</li>
		</Button>
	)
}
