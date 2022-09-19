import { FC, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapCollapse } from '@/features/collapse/map'
import { illustrateChecker } from '@/features/map/lib'
import { Button, Input } from '@/shared/ui'
import { ICompletedPosition, IInitIndex, IMapSidebarProps } from './types'
import './styles.scss'

export const MapSidebar: FC<IMapSidebarProps> = ({
	areaPolygons,
	districtPolygons,
	polygons,
	illustratePolygons,
	activePolygon,
	setDistrictPolygons
}) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const handleChange = (e: any) => {
		const target = e.target
		const name = target.name
		const value = target.value
		if (name === 'iin') {
		}
	}

	const handleClickIllustrate = (e: any) => {
		e.preventDefault()
		const target = e.target
		const illustrate = target.dataset.illustrate
		searchParams.set('illustrate', illustrate)
		setSearchParams(searchParams)
	}

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			const target = e.target
			const illustrate = target.dataset.illustrate
			searchParams.set('illustrate', illustrate)
			setSearchParams(searchParams)
		}
	}

	return (
		<aside className='map_sidebar'>
			<header className='map_sidebar_header'>
				<span
					className={
						illustrateChecker(illustratePolygons, 'area') ? 'map_sidebar_header_item active' : 'map_sidebar_header_item'
					}
					onClick={handleClickIllustrate}
					onKeyUp={handleKeyUp}
					role='button'
					tabIndex={0}
					data-illustrate='area'
				>
					Area
				</span>
				<span
					className={
						illustrateChecker(illustratePolygons, 'district')
							? 'map_sidebar_header_item active'
							: 'map_sidebar_header_item'
					}
					onClick={handleClickIllustrate}
					onKeyUp={handleKeyUp}
					role='button'
					tabIndex={0}
					data-illustrate='district'
				>
					District
				</span>
				<span
					className={
						illustrateChecker(illustratePolygons, 'polygon')
							? 'map_sidebar_header_item active'
							: 'map_sidebar_header_item'
					}
					onClick={handleClickIllustrate}
					onKeyUp={handleKeyUp}
					role='button'
					tabIndex={0}
					data-illustrate='polygon'
				>
					Polygon
				</span>
			</header>
			<section className='map_sidebar_content'>
				<div className='map_sidebar_item sidebar_1'>
					<Input
						className='map_sidebar_input map_sidebar_input_2'
						placeholder='Enter IIN'
						type='text'
						name='iin'
						onChange={handleChange}
					/>
					<Button className='map_sidebar_input map_sidebar_button'>Complete Position</Button>
				</div>
				<div className='map_sidebar_item sidebar_2'>
					<ul className='map_ul' role='menu'>
						{currentPlygons && (
							<>
								{currentPolygons.map((item: any, index: number) => (
									<MapCollapse key={`${item}-${index}`} data={item} setDistrictPolygons={setDistrictPolygons} />
								))}
							</>
						)}
					</ul>
				</div>
			</section>
		</aside>
	)
}
