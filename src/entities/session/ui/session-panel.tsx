import { Avatar, Menu, MenuButton, MenuGroup, MenuItem, MenuList, type MenuProps } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { AiFillSetting, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router'

import { routes } from '~src/shared/routes'

import * as model from '../model'

interface SessionPanelProps extends Omit<MenuProps, 'children'> {
	[key: string]: any
}

export function SessionPanel(props: SessionPanelProps) {
	const [handleSignOut] = useUnit([model.signedOut])
	const navigate = useNavigate()
	const [session] = useUnit([model.$session])

	return (
		<Menu placement='bottom-end' {...props}>
			<MenuButton>
				<Avatar icon={<FaUserAlt />} size='md' />
			</MenuButton>
			<MenuList>
				<MenuGroup>
					<MenuItem icon={<AiOutlineUser />} onClick={() => navigate(routes.userPublicProfile(session!.id.toString()))}>
						Профиль
					</MenuItem>
					<MenuItem icon={<AiFillSetting />} onClick={() => navigate(routes.userSettingsProfile())}>
						Настройкий
					</MenuItem>
				</MenuGroup>
				<MenuItem icon={<AiOutlineLogout />} onClick={() => handleSignOut()}>
					Выйти
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
