import { memo } from 'react'

import { MapIinList, useIin } from '@/6.entities/map-iin'

import { IinApi, TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { useMutationCustom } from '@/7.shared/lib/react-query'
import { Load } from '@/7.shared/ui'

import { MapIinForm } from './form'
import './styles.scss'

type TMapIinProps = {
	setIllustrate: TSetState<TPolygonType | undefined>
}

export const MapIin = memo((props: TMapIinProps) => {
	const { setIllustrate } = props

	const [iin, setIin] = useIin()
	const [coincideIinMutation, abortCoincideIin] = useMutationCustom((signal, iin: number) => {
		return IinApi.findByIin({ signal, iin })
	})

	return (
		<div className='map_iin'>
			<MapIinForm
				mutationCoincideIin={coincideIinMutation}
				abortCoincideIin={abortCoincideIin}
				iin={iin}
				setIin={setIin}
				setIllustrate={setIllustrate}
			/>
			{iin && (coincideIinMutation.data || coincideIinMutation.isLoading) && (
				<div className='map_iin_coincide_wrapper'>
					<div className='map_iin_coincide'>
						{coincideIinMutation.data && coincideIinMutation.data.length > 0 && (
							<MapIinList data={coincideIinMutation.data} setIin={setIin} />
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
})
