import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { ISidebarTemplateProps } from './types'
import './styles.scss'

export const SidebarTemplate: FC<PropsWithChildren<ISidebarTemplateProps>> = ({ data, children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		if (data?.data) {
			setIsOpen(prev => (data?.data ? true : false))
		}
	}, [data])

	const handleClick = () => {
		setIsOpen(prev => (data?.data ? !prev : prev))
	}

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			setIsOpen(false)
		}
	}

	return (
		<div className={`sidebar_wrapper ${isOpen ? 'open' : 'close'}`}>
			<aside className={`sidebar ${isOpen ? 'open' : 'close'}`}>{children}</aside>

			<span
				className={`sidebar_burger ${isOpen ? 'open' : 'close'}`}
				onClick={handleClick}
				onKeyUp={handleKeyUp}
				role='button'
				tabIndex={0}
			></span>
		</div>
	)
}
