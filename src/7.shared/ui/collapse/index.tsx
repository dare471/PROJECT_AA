import { memo, MouseEvent, ReactNode, useEffect, useState } from 'react'
import useCollapse from 'react-collapsed'

import { GetTogglePropsInput, GetTogglePropsOutput, UseCollapseInput } from 'react-collapsed/dist/types'

import { Button } from '../button'
import './styles.scss'

type TCustomButtonProps = {
	getToggleProps: (config?: GetTogglePropsInput | undefined) => GetTogglePropsOutput
	isExpanded: boolean
	label: string
	onClick?: (event: MouseEvent<Element, globalThis.MouseEvent>) => void
}

// eslint-disable-next-line @typescript-eslint/ban-types
type TCollapseProps = {
	children: ReactNode
	label: string
	collapseConfig?: UseCollapseInput
	onClick?: (event: MouseEvent<Element, globalThis.MouseEvent>) => void
	className?: string
	classNameButton?: string
	classNameChildren?: string
	isExpandedCustom?: boolean
	CustomButton?: (props: TCustomButtonProps) => ReactNode
}

const _Collapse = (props: TCollapseProps) => {
	const {
		label,
		collapseConfig,
		onClick,
		className,
		classNameButton,
		classNameChildren,
		isExpandedCustom,
		CustomButton,
		children
	} = props

	const [isExpanded, setIsExpanded] = useState<boolean>(() => {
		if (isExpandedCustom !== undefined) {
			return isExpandedCustom
		}
		return false
	})
	const defaultConfig = {
		duration: 500
	}

	const { getToggleProps, getCollapseProps } = useCollapse({
		isExpanded: isExpanded,
		...defaultConfig,
		...collapseConfig
	})

	useEffect(() => {
		if (isExpandedCustom !== undefined) {
			setIsExpanded(isExpandedCustom)
		}
	}, [isExpandedCustom])

	const handleClick = (event: MouseEvent<Element, globalThis.MouseEvent>) => {
		setIsExpanded(prev => !prev)
	}

	return (
		<div className={`collapse_wrapper${className ? ' ' + className : ''}`}>
			{CustomButton ? (
				<>{CustomButton({ getToggleProps, isExpanded, label, onClick: onClick ? onClick : handleClick })}</>
			) : (
				<Button
					className={`collapse_button${classNameButton ? ' ' + classNameButton : ''}`}
					{...getToggleProps({ onClick: onClick ? onClick : handleClick })}
				>
					<h6 className='collapse_label'>{label}</h6>
					<span className={`collapse_arrow${isExpanded ? ' active' : ''}`}></span>
				</Button>
			)}
			<div className={`collapse_children${classNameChildren ? ' ' + classNameChildren : ''}`} {...getCollapseProps()}>
				{children}
			</div>
		</div>
	)
}

export const Collapse = memo(_Collapse)
