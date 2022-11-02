import { useNavigate } from 'react-router'

import { sessionModel } from '@/6.entities/session'

import { routes } from '@/7.shared/config'
import { useAppDispatch, useAppSelector } from '@/7.shared/lib/redux'
import { DropDown, DropDownItem } from '@/7.shared/ui'

import './styles.scss'

export const UserPanel = () => {
	const dispatch = useAppDispatch()
	const userName = useAppSelector(state => state.session.userName) as string
	const userId = useAppSelector(state => state.session.userId) as string
	const navigate = useNavigate()

	const handleClickLogout = () => {
		dispatch(sessionModel.logout())
		navigate(routes.signIn({}))
	}

	return (
		<div className='user_panel'>
			<DropDown>
				<DropDownItem className='user_panel_item'>{userName}</DropDownItem>
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
				<DropDownItem onClick={handleClickLogout}>Logout</DropDownItem>
			</DropDown>
		</div>
	)
}
