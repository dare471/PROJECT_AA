import { FC } from 'react'
import { UserAvatar } from '@/6.entities/user'
import { Load } from '@/7.shared/ui'
import { IUserInfoProps } from './types'
import './styles.scss'

export const UserInfo: FC<IUserInfoProps> = ({ data, isLoading }) => {
	return (
		<>
			<div className='userinfo'>
				{isLoading && <Load className='userinfo_item_load' />}
				{data && (
					<>
						<UserAvatar className='userinfo_avatar' />
						<div className='userinfo_content'>
							<header className='userinfo_content_header'>
								<h6 className='userinfo_title'>{data.FULL_NAME}</h6>
							</header>
							<div className='userinfo_info'>
								<div className='userinfo_info_item'>
									<h6 className='userinfo_title'>Почта:</h6>
									<h6 className='userinfo_text'>{data.EMAIL}</h6>
								</div>
								<div className='userinfo_info_item'>
									<h6 className='userinfo_title'>Офис:</h6>
									<h6 className='userinfo_text'>{data.DIRECTION}</h6>
								</div>
								<div className='userinfo_info_item'>
									<h6 className='userinfo_title'>Номер:</h6>
									<h6 className='userinfo_text'>{data.PHONE || 'Нету'}</h6>
								</div>
								<div className='userinfo_info_item'>
									<h6 className='userinfo_title'>Позиция:</h6>
									<h6 className='userinfo_text'>{data.POSITION}</h6>
								</div>
								<div className='userinfo_info_item'>
									<h6 className='userinfo_title'>Подразделение:</h6>
									<h6 className='userinfo_text'>{data.SUBDIVISION}</h6>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	)
}
