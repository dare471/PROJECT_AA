import { FC } from 'react'
import { IMapIinListItemProps } from './types'
import './styles.scss'

export const MapIinListItem: FC<IMapIinListItemProps> = ({ data, index, style, handleSelect }) => {
	const handleClick = () => {
		handleSelect(data[index])
	}

	const handleKeyup = () => {
		handleSelect(data[index])
	}

	return (
		<li className='map_iin_list_li' style={style}>
			<div className='map_iin_list_button' role='button' tabIndex={0} onClick={handleClick} onKeyUp={handleKeyup}>
				<div className='map_iin_list_iin'>{data[index]['IIN_BIN']}</div>
				<h4 className='map_iin_list_too'>{data[index]['NAME']}</h4>
			</div>
		</li>
	)
}
