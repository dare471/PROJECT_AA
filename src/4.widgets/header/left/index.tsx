import { FC } from 'react'
import { useNavigate } from 'react-router'
import { ROUTE_TO_HOME } from '@/7.shared/config'
import { IHeaderLeftProps } from './types'
import './styles.scss'

export const HeaderLeft: FC<IHeaderLeftProps> = ({ logo }) => {
	const navigate = useNavigate()

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			navigate(ROUTE_TO_HOME())
		}
	}

	return (
		<div className='header_left'>
			<div
				className='header_logo_wrapper'
				onClick={() => navigate(ROUTE_TO_HOME())}
				role='button'
				tabIndex={0}
				onKeyUp={handleKeyUp}
			>
				<h3 className='header_logo_text'>AlemAgro</h3>
			</div>
		</div>
	)
}
