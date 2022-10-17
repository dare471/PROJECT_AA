import { FC } from 'react'
import { UserImagePlaceholder } from '@/7.shared/assets'
import { useAppSelector } from '@/7.shared/lib'
import { Avatar } from '@/7.shared/ui'
import { IUserAvatarProps } from './types'

export const UserAvatar: FC<IUserAvatarProps> = ({ className, onClick }) => {
	const userImage = useAppSelector(state => state.user.userImage)

	return <Avatar src={UserImagePlaceholder} className={className} onClick={onClick} role='menuitem' />
}
