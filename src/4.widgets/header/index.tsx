import { FC } from 'react'
import { useAuth } from '@/6.entities/user'
import { PublicHeader } from './public'

export const Header: FC = () => {
	const { isAuth } = useAuth()

	return <>{<PublicHeader auth={isAuth} />}</>
}
