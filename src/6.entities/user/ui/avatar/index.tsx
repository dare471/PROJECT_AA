import { UserImagePlaceholder } from '@/7.shared/assets'
import { useAppSelector } from '@/7.shared/lib/redux'
import { Avatar, TAvatarAllProps, TAvatarProps } from '@/7.shared/ui'

type TUserAvatarProps = Omit<TAvatarAllProps, keyof Omit<TAvatarProps, 'onClick'>>

export const UserAvatar = (props: TUserAvatarProps) => {
	const { className, onClick } = props

	const avatar = useAppSelector(state => state.session.userAvatar)

	return <Avatar src={avatar || UserImagePlaceholder} className={className} onClick={onClick} role='menuitem' />
}
