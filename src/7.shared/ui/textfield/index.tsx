import { FC, forwardRef, useId } from 'react'
import { ITextFieldProps } from './types'
import { Input } from '../input'
import { Label } from '../label'
import './styles.scss'

export const TextField: FC<ITextFieldProps> = forwardRef(
	(
		{
			id,
			classNameWrapper,
			classNameInput,
			classNameLabel,
			autoComplete,
			variant = 'default',
			placeholder = ' ',
			title,
			type,
			...props
		},
		ref
	) => {
		const textFieldId = useId()

		return (
			<div className={classNameWrapper ? `textfield-wrapper ${classNameWrapper}` : 'textfield-wrapper'}>
				<Input
					id={`${textFieldId}-${id}`}
					className={classNameInput ? `textfield-input-${variant} ${classNameInput}` : `textfield-input-${variant}`}
					type={type}
					autoComplete={autoComplete}
					placeholder={placeholder}
					ref={ref}
					{...props}
				/>
				<Label
					id={`${textFieldId}-${id}`}
					className={classNameLabel ? `textfield-label-${variant} ${classNameLabel}` : `textfield-label-${variant}`}
					title={title}
				/>
			</div>
		)
	}
)
