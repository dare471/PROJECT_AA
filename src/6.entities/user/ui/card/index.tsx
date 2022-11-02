import { ReactNode } from 'react'

import { IUserInfo } from '@/7.shared/api'
import { Card, Load } from '@/7.shared/ui'

import { UserAvatar } from '../avatar'
import './styles.scss'

type TUserInfoProps = {
	data?: IUserInfo
	loading?: boolean
	contentVisible?: boolean
	avatarVisible?: boolean
	className?: string
}

export const UserCard = (props: TUserInfoProps) => {
	const { data, loading, contentVisible = true, avatarVisible = true, className } = props

	return (
		<Card className={`user_card${className ? ' ' + className : ''}`}>
			{loading ? (
				<Load className='user_card_loader' />
			) : (
				<>
					{avatarVisible && <UserAvatar className='user_card_avatar' />}
					{data && (
						<div className='user_card_item'>
							<UserCardTitle title={data.FULL_NAME} />
							<UserCardContent visible={contentVisible}>
								<UserCardContentItem title='Почта' text={data.EMAIL} />
								<UserCardContentItem title='Офиc' text={data.DIRECTION} />
								<UserCardContentItem title='Номер' text={data.PHONE} />
								<UserCardContentItem title='Позиция' text={data.POSITION} />
								<UserCardContentItem title='Подразадение' text={data.SUBDIVISION} />
							</UserCardContent>
						</div>
					)}
				</>
			)}
		</Card>
	)
}

type TUserCardTitleProps = {
	title: string
}

const UserCardTitle = ({ title }: TUserCardTitleProps) => (
	<div className='user_card_title'>
		<h6 className='user_card_title'>{title}</h6>
	</div>
)

type TUserCardContentProps = {
	children: ReactNode
	visible: boolean
}

const UserCardContent = ({ visible, children }: TUserCardContentProps) => (
	<>{visible && <div className='user_card_content'>{children}</div>}</>
)

type TUserCardContentItemProps = {
	title: string
	text: string
}

const UserCardContentItem = ({ title, text }: TUserCardContentItemProps) => (
	<div className='user_card_content_item'>
		<h3 className='user_card_content_title'>{title}</h3>
		<h6 className='user_card_content_text'>{text}</h6>
	</div>
)
