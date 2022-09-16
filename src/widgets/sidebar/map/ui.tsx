import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FlatIndexLocationWithAlign, VirtuosoHandle } from 'react-virtuoso'
import { MapList } from '@/features/lists/map'
import { illustrateChecker } from '@/features/map/lib'
import { Button, Input } from '@/shared/ui'
import { ICompletedPosition, IInitIndex, IMapSidebarProps } from './types'
import './styles.scss'

export const MapSidebar: FC<IMapSidebarProps> = ({
	districtPolygons,
	areaPolygons,
	polygons,
	illustratePolygons,
	position,
	activePolygon,
	setPosition
}) => {
	const [completedPosition, setCompletedPosition] = useState<ICompletedPosition>({ x: null, y: null })
	const [initIndex, setInitIndex] = useState<IInitIndex>({
		index: 'LAST',
		align: 'center',
		behavior: 'smooth'
	})
	const virtuoso = useRef<VirtuosoHandle>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const listItems = useMemo(() => {
		if (areaPolygons) {
			const result = areaPolygons.map((area: any) => {
				if (districtPolygons) {
					const equal = districtPolygons.filter((district: any) => area.properties.GID_1 === district.properties.GID_1)

					return { ...area, children: equal }
				}
				return area
			})

			return result
		}

		return null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [areaPolygons, districtPolygons, polygons])

	useEffect(() => {
		console.log()
	}, [completedPosition])

	const handleChange = (e: any) => {
		const target = e.target
		const name = target.name
		const value = target.value
		if (name === 'x') {
			setCompletedPosition(prev => ({ ...prev, x: value }))
		} else if (name === 'y') {
			setCompletedPosition(prev => ({ ...prev, y: value }))
		}
	}

	const handleClickInput = () => {
		setPosition(prev => {
			if (completedPosition.x && prev.x !== completedPosition.x) {
				return { ...prev, x: completedPosition.x }
			} else if (completedPosition.y && prev.y !== completedPosition.y) {
				return { ...prev, y: completedPosition.y }
			}

			return prev
		})
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
					<div className='map_sidebar_inputs'>
						<Input
							placeholder='Enter X Position'
							type='number'
							className='map_sidebar_input map_sidebar_input_1'
							name='x'
							value={completedPosition.x || ''}
							onChange={handleChange}
						/>
						<Input
							placeholder='Enter Y Position'
							type='number'
							className='map_sidebar_input map_sidebar_input_2'
							name='y'
							value={completedPosition.y || ''}
							onChange={handleChange}
						/>
					</div>
					<Input
						placeholder='Enter IIN'
						type='text'
						className='map_sidebar_input map_sidebar_input_2'
						onChange={handleChange}
					/>
					<Button className='map_sidebar_input map_sidebar_button' onClick={handleClickInput}>
						Complete Position
					</Button>
				</div>
				<div className='map_sidebar_item sidebar_2'>
					<ul className='map_ul' role='menu'>
						{listItems && (
							<MapList
								data={listItems}
								illustratePolygons={illustratePolygons}
								activePolygon={activePolygon}
								initIndex={initIndex}
								setInitIndex={setInitIndex}
							/>
						)}
						<div
							className='map_ul_up'
							onClick={() => setInitIndex(prev => ({ ...prev, index: 0 }))}
							onKeyUp={() => setInitIndex(prev => ({ ...prev, index: 0 }))}
							role='button'
							tabIndex={0}
						>
							UP
						</div>
					</ul>
				</div>
			</section>
		</aside>
	)
}
