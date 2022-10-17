import { useNavigate } from 'react-router'
import 'react-router'
import { logout } from '@/6.entities/user'
import { routes } from '@/7.shared/config'
import { useAppDispatch, useAppSelector } from '@/7.shared/lib'
import { DropDown, DropDownItem } from '@/7.shared/ui'
import './styles.scss'

export const UserMenu = () => {
	const dispatch = useAppDispatch()
	const userName = useAppSelector(state => state.user.userName) as string
	const userId = useAppSelector(state => state.user.userId) as string
	const navigate = useNavigate()

	return (
		<div className='user_menu'>
			<DropDown>
				<DropDownItem className='user_menu_item' onClick={() => console.log(userName)}>
					{userName}
				</DropDownItem>
				<DropDownItem
					onClick={() =>
						navigate(
							routes.profile({
								params: {
									userId
								}
							})
						)
					}
				>
					Profile
				</DropDownItem>
				<DropDownItem onClick={() => dispatch(logout())}>Logout</DropDownItem>
			</DropDown>
		</div>
	)
}
