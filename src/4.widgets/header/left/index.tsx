import { useNavigate } from 'react-router'

import { Logo } from '@/7.shared/assets'
import { routes } from '@/7.shared/config'
import { NavbarItem, ProjectLogo } from '@/7.shared/ui'

import './styles.scss'

type THeaderLeftProps = {
	logo: boolean
}

export const HeaderLeft = (props: THeaderLeftProps) => {
	const { logo } = props
	const navigate = useNavigate()

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			navigate(routes.home({}))
		}
	}

	return (
		<div className='header_left'>
			{logo && (
				<NavbarItem
					to={routes.home({})}
					classNameLink={({ isActive }) => (isActive ? '' : '')}
					content={
						<ProjectLogo
							classNameImage='header_logo_image'
							alt='Header Project Logo'
							tabIndex={0}
							role='button'
							onClick={() => navigate(routes.home({}))}
							onKeyUp={handleKeyUp}
						/>
					}
				></NavbarItem>
			)}
		</div>
	)
}
