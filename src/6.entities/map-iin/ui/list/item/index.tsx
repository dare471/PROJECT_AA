import { CSSProperties } from 'react'

import { TIin } from '@/6.entities/map-iin/model'

import { TSetState } from '@/7.shared/lib/react'

import './styles.scss'

type TMapIinListItemProps = {
	data: any
	index: number
	style: CSSProperties
	setIin: TSetState<TIin>
}

export const MapIinListItem = (props: TMapIinListItemProps) => {
	const { data, index, style, setIin } = props

	const handleClick = () => {
		setIin(data[index]['IIN_BIN'])
	}

	const handleKeyup = () => {
		setIin(data[index]['IIN_BIN'])
	}

	//FIXME: remove redundancy
	return (
		<li className='map_iin_list_li' style={style}>
			<div className='map_iin_list_button' role='button' tabIndex={0} onClick={handleClick} onKeyUp={handleKeyup}>
				<div className='map_iin_list_iin'>{data[index]['IIN_BIN']}</div>
				<h4 className='map_iin_list_too'>{data[index]['NAME']}</h4>
			</div>
		</li>
	)
}
