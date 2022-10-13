import { FC } from 'react'
import { useAuth } from '@/6.entities/user'
import { Templates } from '../templates'
import { HeaderCenter } from './center'
import { HeaderLeft } from './left'
import { HeaderRight } from './right'

export const Header: FC = () => {
	const { isAuth } = useAuth()

	return (
		<Templates.Header>
			<HeaderLeft logo />
			<HeaderCenter home map />
			<HeaderRight signIn={!isAuth} dropdown={isAuth} />
		</Templates.Header>
	)
}
