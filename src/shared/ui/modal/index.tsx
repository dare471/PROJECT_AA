import { FC, PropsWithChildren } from 'react'
import { IModalProps } from './types'
import './styles.scss'

export const Modal: FC<PropsWithChildren<IModalProps>> = ({
	modalWrapperClassName,
	modalClassName,
	closeClassName,
	children,
	onClick,
	...props
}) => {
	const handleClick = (e: any) => {
		const target = e.target.closest('.modal')
		if (!target) {
			onClick()
		}
	}

	return (
		<section
			className={`modal_wrapper${modalWrapperClassName ? ' ' + modalWrapperClassName : ''}`}
			onClick={handleClick}
			onKeyUp={handleClick}
			role='menu'
			tabIndex={-1}
		>
			<div className={`modal${modalClassName ? ' ' + modalClassName : ''}`} {...props}>
				{children}
				<button className='modal_close_button' onClick={onClick}>
					<span className={`modal_close${closeClassName ? ' ' + closeClassName : ''}`}></span>
				</button>
			</div>
		</section>
	)
}
