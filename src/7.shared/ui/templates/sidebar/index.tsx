import { Resizable } from 're-resizable'
import { HTMLProps, ReactNode, useEffect, useState } from 'react'

import { typedHandleKeyUp } from '@/7.shared/lib/browser'

import './styles.scss'

type TSidebarTemplateProps = {
	children: ReactNode
	visible: boolean
	classNameASide?: string
} & HTMLProps<HTMLElement>

export const SidebarTemplate = (props: TSidebarTemplateProps) => {
	const { className, classNameASide, visible, children } = props

	const [isOpen, setIsOpen] = useState<boolean>(visible)

	useEffect(() => {
		setIsOpen(visible)
	}, [visible])

	const handleClick = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<>
			<Resizable
				className={`sidebar${isOpen ? ' open' : ' close'}${classNameASide ? ' ' + classNameASide : ''}`}
				as='aside'
				handleWrapperClass={`sidebar_resize`}
				enable={{ right: true }}
			>
				<div className={`sidebar_content${isOpen ? ' open' : ' close'}${className ? ' ' + className : ''}`}>
					{children}
				</div>

				<span
					className={`sidebar_burger${isOpen ? ' open' : ' close'}`}
					onClick={handleClick}
					onKeyUp={event => typedHandleKeyUp(event, handleClick)}
					role='button'
					tabIndex={0}
				></span>
			</Resizable>
			<span
				className={`sidebar_burger_mobile${isOpen ? ' open' : ' close'}`}
				onClick={handleClick}
				onKeyUp={event => typedHandleKeyUp(event, handleClick)}
				role='button'
				tabIndex={0}
			></span>
		</>
	)
}
