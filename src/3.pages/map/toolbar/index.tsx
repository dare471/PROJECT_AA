import { ReactNode, useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { useQueryParam } from 'use-query-params'

import { TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { Button, Select } from '@/7.shared/ui'

import './styles.scss'

type TSelect<T> = {
	label: T
	value: T
}
type TSelectedYears = '2021' | '2022'

type TSelectedProducts = 'Кукуруза' | 'Подсолнечник'

type TMapToolbarProps = {
	illustrate?: TPolygonType
	setIllustrate: TSetState<TPolygonType | undefined>
	handleMutation: any
}

export const MapToolbar = (props: TMapToolbarProps) => {
	const { illustrate, setIllustrate, handleMutation } = props

	const [selectedYears, setSelectedYears] = useState<TSelect<TSelectedYears>[]>([
		{
			label: '2022',
			value: '2022'
		}
	])
	const [selectedProducts, setSelectedProducts] = useState<TSelect<TSelectedProducts>[]>([
		{
			label: 'Кукуруза',
			value: 'Кукуруза'
		},
		{
			label: 'Подсолнечник',
			value: 'Подсолнечник'
		}
	])
	const [isShow, setIsShow] = useState<boolean>(false)
	const [regionMutation, abortRegionMutation] = handleMutation('region')
	const [illustrateDataQP] = useQueryParam(`${illustrate}`)

	useEffect(() => {
		if (isShow) {
			if (selectedProducts.length > 0 || selectedYears.length > 0) {
				const newSelectedProducts = selectedProducts.map(item => item.value)
				const newSelectedYears = selectedYears.map(item => item.value)
				regionMutation.mutate({
					id: illustrateDataQP,
					data: { season: [...newSelectedYears], cult: [...newSelectedProducts] }
				})
			}
			return () => {
				if (abortRegionMutation?.current) {
					abortRegionMutation?.current.abort()
				}
			}
		}
	}, [isShow, selectedProducts, selectedYears])

	const handleChangeYears = (selected: any) => {
		setSelectedYears(selected)
	}

	const handleChangeProducts = (selected: any) => {
		setSelectedProducts(selected)
	}

	const handleClick = () => {
		setIsShow(prev => !prev)
	}

	return (
		<div className={`map_toolbar_wrapper${isShow ? ' show' : ' hide'}`}>
			<div className={`map_toolbar${isShow ? ' show' : ' hide'}`}>
				<MapToolbarItem className='first'>
					<Select
						className='map_toolbar_select'
						classNamePrefix='map_toolbar_selected'
						options={[
							{ value: 'Кукуруза', label: 'Кукуруза' },
							{ value: 'Подсолнечник', label: 'Подсолнечник' }
						]}
						isMulti
						isSearchable={false}
						closeMenuOnSelect={false}
						isDisabled={illustrate === 'region' ? false : true}
						value={selectedProducts}
						onChange={handleChangeProducts}
					/>
				</MapToolbarItem>
				<MapToolbarItem className='second'>
					<Select
						className='map_toolbar_select'
						classNamePrefix='map_toolbar_selected'
						options={[
							{ value: '2021', label: '2021' },
							{ value: '2022', label: '2022' }
						]}
						isMulti
						isSearchable={false}
						closeMenuOnSelect={false}
						isDisabled={illustrate === 'region' ? false : true}
						value={selectedYears}
						onChange={handleChangeYears}
					/>
				</MapToolbarItem>
			</div>
			<Button
				className={`map_toolbar_burger_button${isShow ? ' show' : ' hide'}`}
				onClick={handleClick}
				disabled={illustrate === 'region' ? false : true}
			>
				<FiFilter className='map_toolbar_burger' />
			</Button>
		</div>
	)
}

type TMapToolbarItemProps = {
	children: ReactNode
	className?: string
}

const MapToolbarItem = ({ className, children }: TMapToolbarItemProps) => (
	<div className={`map_toolbar_item${className ? ' ' + className : ''}`}>{children}</div>
)
