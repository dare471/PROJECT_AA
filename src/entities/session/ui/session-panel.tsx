import { Avatar, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { AiFillSetting, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'

export function SessionPanel() {
	return (
		<Menu>
			<MenuButton>
				<Avatar icon={<FaUserAlt />} size='md' />
			</MenuButton>
			<MenuList>
				<MenuGroup>
					<MenuItem icon={<AiOutlineUser />}>Профиль</MenuItem>
					<MenuItem icon={<AiFillSetting />}>Настройкий</MenuItem>
				</MenuGroup>
				<MenuItem icon={<AiOutlineLogout />}>Выйти</MenuItem>
			</MenuList>
		</Menu>
	)
}
