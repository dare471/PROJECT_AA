import { Avatar, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { AiFillSetting, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'

import * as model from '../model'

export function SessionPanel() {
	const [handleSignOut] = useUnit([model.signedOut])

	return (
		<Menu placement='bottom-end'>
			<MenuButton>
				<Avatar icon={<FaUserAlt />} size='md' />
			</MenuButton>
			<MenuList>
				<MenuGroup>
					<MenuItem icon={<AiOutlineUser />}>Профиль</MenuItem>
					<MenuItem icon={<AiFillSetting />}>Настройкий</MenuItem>
				</MenuGroup>
				<MenuItem icon={<AiOutlineLogout />} onClick={() => handleSignOut()}>
					Выйти
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
