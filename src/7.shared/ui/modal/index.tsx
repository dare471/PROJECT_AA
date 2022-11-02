import { forwardRef, HTMLProps, MouseEvent, ReactNode, Ref } from 'react'

import { typedHandleKeyUp } from '@/7.shared/lib/browser'

import './styles.scss'

export type TModalProps = {
	children: ReactNode
	modalWrapperClassName?: string
	modalClassName?: string
	closeClassName?: string
	onClick: (e: MouseEvent<HTMLElement>) => void
}

export type TModalAllProps = TModalProps & HTMLProps<HTMLDivElement>

export const Modal = forwardRef((props: TModalAllProps, ref: Ref<HTMLElement>) => {
	const { modalWrapperClassName, modalClassName, closeClassName, children, onClick, ...otherProps } = props

	const handleClick = (e: MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement
		const closest = target.closest('.modal')
		if (!closest) {
			onClick(e)
		}
	}

	return (
		<section
			className={`modal_wrapper${modalWrapperClassName ? ' ' + modalWrapperClassName : ''}`}
			onClick={handleClick}
			onKeyUp={event => typedHandleKeyUp(event, handleClick)}
			role='menu'
			tabIndex={-1}
			ref={ref}
		>
			<div className={`modal${modalClassName ? ' ' + modalClassName : ''}`} {...otherProps}>
				{children}
				<button className='modal_close_button' onClick={onClick}>
					<span className={`modal_close${closeClassName ? ' ' + closeClassName : ''}`}></span>
				</button>
			</div>
		</section>
	)
})
