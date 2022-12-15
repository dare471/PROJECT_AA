import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
	children: React.ReactNode
	className?: string
	el?: string
}

const appRoot = document.getElementById('app')

export const Portal = ({ className = 'root-portal', el = 'div', children }: Props) => {
	const [container] = React.useState<HTMLElement>(() => document.createElement(el))

	React.useEffect(() => {
		container.classList.add(className)
		appRoot!.appendChild(container)

		return () => {
			appRoot!.removeChild(container)
		}
	}, [])

	return ReactDOM.createPortal(children, container)
}
