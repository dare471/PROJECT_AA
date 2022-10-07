import { FC, useCallback, useState } from 'react'
import { MapIinList } from '@/6.entities/map-iin-list'
import { polygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'
import { Load } from '@/7.shared/ui'
import { IMapIinProps } from './types'
import { MapIinForm } from '../map-iin-form'
import './styles.scss'

export const MapIin: FC<IMapIinProps> = ({ handleChangeCurrentPolygon }) => {
	const [select, setSelect] = useState<any>(null)
	const { mutation: mutationCoincideIin, abortControllerRef: abortCoincideIin } = useMutationCustom(
		(iin: number, signal) => polygonApi.findByIin({ iin, signal })
	)

	const handleSelect = useCallback((coincide: any) => {
		setSelect(coincide)
	}, [])

	return (
		<div className='map_iin'>
			<MapIinForm
				mutationCoincideIin={mutationCoincideIin}
				abortCoincideIin={abortCoincideIin}
				select={select}
				handleChangeCurrentPolygon={handleChangeCurrentPolygon}
			/>
			{(mutationCoincideIin.data || mutationCoincideIin.isLoading) && (
				<div className='map_iin_coincide_wrapper'>
					<div className='map_iin_coincide'>
						{mutationCoincideIin.data && mutationCoincideIin.data.length > 0 && (
							<MapIinList data={mutationCoincideIin.data} handleSelect={handleSelect} />
						)}
						{mutationCoincideIin.isLoading && <Load className='map_iin_load' />}
						{mutationCoincideIin.data && mutationCoincideIin.data.length === 0 && (
							<div className='map_iin_message'>Нету совпадений</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
