import { useAuth } from '@/6.entities/session'

import { Templates } from '@/7.shared/ui'

import { HeaderCenter } from './center'
import { HeaderLeft } from './left'
import { HeaderRight } from './right'

export const Header = () => {
	const { isAuth } = useAuth()

	return (
		<Templates.Header>
			<HeaderLeft logo />
			<HeaderCenter home map />
			<HeaderRight signIn={!isAuth} userPanel={isAuth} />
		</Templates.Header>
	)
}
