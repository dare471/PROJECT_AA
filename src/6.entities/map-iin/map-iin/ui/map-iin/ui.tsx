import { FC, useCallback, useState } from 'react'
import { MapIinList } from '@/6.entities/map-iin'
import { PolygonApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'
import { Load } from '@/7.shared/ui'
import { MapIinForm } from '../form'
import './styles.scss'

export const MapIin: FC = () => {
	const [iin, setIin] = useState<number | ''>('')
	const [coincideIinMutation, abortCoincideIin] = useMutationCustom((signal, iin: number) => {
		return PolygonApi.findByIin({ signal, iin })
	})

	const handleSelect = useCallback((coincide: any) => {
		setIin(coincide['IIN_BIN'])
	}, [])

	return (
		<div className='map_iin'>
			<MapIinForm
				mutationCoincideIin={coincideIinMutation}
				abortCoincideIin={abortCoincideIin}
				iin={iin}
				setIin={setIin}
			/>
			{iin && (coincideIinMutation.data || coincideIinMutation.isLoading) && (
				<div className='map_iin_coincide_wrapper'>
					<div className='map_iin_coincide'>
						{coincideIinMutation.data && coincideIinMutation.data.length > 0 && (
							<MapIinList data={coincideIinMutation.data} handleSelect={handleSelect} />
						)}
						{coincideIinMutation.isLoading && <Load className='map_iin_load' />}
						{coincideIinMutation.data && coincideIinMutation.data.length === 0 && (
							<div className='map_iin_message'>Нету совпадений</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
