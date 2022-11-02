import { forwardRef, HTMLProps, Ref, useId } from 'react'

import { Input } from '../input'
import { Label } from '../label'
import './styles.scss'

type TTextFieldProps = {
	variant?: 'default'
	classNameWrapper?: string
	classNameInput?: string
	classNameLabel?: string
}

type TTextFieldAllProps = TTextFieldProps & HTMLProps<HTMLInputElement>

export const TextField = forwardRef((props: TTextFieldAllProps, ref: Ref<HTMLDivElement>) => {
	const {
		id,
		classNameWrapper,
		classNameInput,
		classNameLabel,
		variant = 'default',
		placeholder = ' ',
		title,
		...otherProps
	} = props

	const textFieldId = useId()

	return (
		<div className={classNameWrapper ? `textfield-wrapper ${classNameWrapper}` : 'textfield-wrapper'} ref={ref}>
			<Input
				id={`${textFieldId}-${id}`}
				className={classNameInput ? `textfield-input-${variant} ${classNameInput}` : `textfield-input-${variant}`}
				placeholder={placeholder}
				{...otherProps}
			/>
			<Label
				id={`${textFieldId}-${id}`}
				className={classNameLabel ? `textfield-label-${variant} ${classNameLabel}` : `textfield-label-${variant}`}
				title={title}
			/>
		</div>
	)
})
