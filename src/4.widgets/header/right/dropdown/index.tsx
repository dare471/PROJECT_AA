import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { UserAvatar, logout } from '@/6.entities/user'
import { ROUTE_TO_PROFILE } from '@/7.shared/config'
import { useAppDispatch, useAppSelector } from '@/7.shared/lib'
import { DropDown, DropDownItem } from '@/7.shared/ui'
import './styles.scss'

export const HeaderDropDown = () => {
	const dispatch = useAppDispatch()
	const userName = useAppSelector(state => state.user.userName) as string
	const userId = useAppSelector(state => state.user.userId) as string
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		setIsOpen(false)
	}, [location])

	return (
		<div className='header_dropdown_wrapper'>
			<UserAvatar onClick={() => setIsOpen(prev => !prev)} />
			{isOpen && (
				<DropDown>
					<DropDownItem
						className='header_dropdown_item first'
						icon=''
						title={userName}
						onClick={() => console.log(userName)}
					/>
					<DropDownItem icon='' title='Profile' onClick={() => navigate(ROUTE_TO_PROFILE([userId]))} />
					<DropDownItem icon='' title='Logout' onClick={() => dispatch(logout())} />
				</DropDown>
			)}
		</div>
	)
}
