import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { IMapInfoSidebarLayoutProps } from './types'
import './styles.scss'

export const MapInfoSidebarLayout: FC<PropsWithChildren<IMapInfoSidebarLayoutProps>> = ({ clientInfo, children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		if (clientInfo?.data) {
			setIsOpen(prev => (clientInfo?.data ? true : false))
		}
	}, [clientInfo])

	const handleClick = () => {
		setIsOpen(prev => (clientInfo?.data ? !prev : prev))
	}

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			setIsOpen(false)
		}
	}

	return (
		<div className={`map_info_sidebar_wrapper ${isOpen ? 'open' : 'close'}`}>
			<aside className={`map_info_sidebar ${isOpen ? 'open' : 'close'}`}>{children}</aside>

			<span
				className={`map_info_sidebar_burger ${isOpen ? 'open' : 'close'}`}
				onClick={handleClick}
				onKeyUp={handleKeyUp}
				role='button'
				tabIndex={0}
			></span>
		</div>
	)
}
