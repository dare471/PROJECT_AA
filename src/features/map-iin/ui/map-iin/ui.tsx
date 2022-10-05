import { FC, useCallback, useState } from 'react'
import { findByIin } from '@/shared/api'
import { Load } from '@/shared/ui'
import { IMapIinProps } from './types'
import { MapIinForm } from '../map-iin-form'
import './styles.scss'
import { MapIinList } from '@/entities/map-iin-list'

export const MapIin: FC<IMapIinProps> = ({ handleChangeCurrentPolygon }) => {
	const [coincideIin, setCoincideIin] = useState<any>(null)
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const [select, setSelect] = useState<any>(null)

	const handleFetchIin = useCallback(async (actions: 'reset' | 'fetch', iin: number, signal: AbortSignal) => {
		if (actions === 'reset') {
			setCoincideIin(null)
		} else if (actions === 'fetch') {
			setIsLoad(true)
			const res = await findByIin(iin, signal)
			setIsLoad(false)
			setCoincideIin(res)
		}
	}, [])

	const handleSelect = useCallback((coincide: any) => {
		setSelect(coincide)
	}, [])

	return (
		<div className='map_iin'>
			<MapIinForm
				handleFetchIin={handleFetchIin}
				select={select}
				handleChangeCurrentPolygon={handleChangeCurrentPolygon}
			/>
			{(coincideIin || isLoad) && (
				<div className='map_iin_coincide_wrapper'>
					<div className='map_iin_coincide'>
						{coincideIin && coincideIin.length > 0 && <MapIinList data={coincideIin} handleSelect={handleSelect} />}
						{isLoad && <Load className='map_iin_load' />}
						{coincideIin && coincideIin.length === 0 && <div className='map_iin_message'>Нету совпадений</div>}
					</div>
				</div>
			)}
		</div>
	)
}
