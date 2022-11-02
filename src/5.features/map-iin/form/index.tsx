import { memo, useEffect, useState } from 'react'
import { MutableRefObject } from 'react'
import { UseMutationResult } from 'react-query'
import { useQueryParam } from 'use-query-params'

import { TPolygonType } from '@/7.shared/api'
import { TSetState } from '@/7.shared/lib/react'
import { Button, ErrorSubMessage } from '@/7.shared/ui'
import { TextField } from '@/7.shared/ui/textfield'

import './styles.scss'

type TMapIinFormProps = {
	mutationCoincideIin: UseMutationResult<any, any, any, any>
	abortCoincideIin: MutableRefObject<AbortController | null>
	iin: number | ''
	setIin: TSetState<number | ''>
	setIllustrate: TSetState<TPolygonType | undefined>
}

// const iinSchema = yup.object().shape({
// 	iin: yup
// 		.string()
// 		.matches(/^[0-9]{12}$/gi, 'Must be equal 12 digits')
// 		.required('Required')
// })

export const MapIinForm = memo((props: TMapIinFormProps) => {
	const { mutationCoincideIin, abortCoincideIin, iin, setIin, setIllustrate } = props

	const [error, setError] = useState<string>()
	const [_, setClientPolygonsQP] = useQueryParam('clientPolygons')

	useEffect(() => {
		setError(prev => {
			const strIin = String(iin)
			if (strIin.length < 12 && strIin.length > 0) {
				return 'Необходимо иметь 12 цифр'
			}
			if (strIin.length === 12 && !mutationCoincideIin.data) {
				return 'Такого ИИН не существует'
			}

			return undefined
		})

		if (iin !== '') {
			mutationCoincideIin.mutate(iin)
		}

		return () => {
			abortCoincideIin.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iin])

	const onSubmit = async (e: any) => {
		e.preventDefault()
		try {
			if (String(iin).length === 12) {
				mutationCoincideIin.reset()
				setIin('')
				setIllustrate('clientPolygons')
				setClientPolygonsQP(mutationCoincideIin.data[0]['CLIENT_ID'])
			}
		} catch (err) {
			setIin('')
			mutationCoincideIin.reset()
			console.log('Error from map-iin-form', err)
		}
	}

	const handleChange = (e: any) => {
		const target = e.target
		const value = target.value

		if (value === '') {
			setIin(value)
		}

		if (!isNaN(Number(value)) && parseInt(value)) {
			setIin(value)
		} else {
			setError('You need to write number')
		}
	}

	const handleClick = () => {
		setIin('')
		mutationCoincideIin.reset()
	}

	const handleKeyUp = (e: any) => {
		if (e.key === 'Enter') {
			setIin('')
			mutationCoincideIin.reset()
		}
	}

	return (
		<div className='map_iin_form_wrapper'>
			<form className='map_iin_form' onSubmit={onSubmit}>
				<TextField
					autoComplete='cc-number'
					classNameWrapper='map_iin_textfield_wrapper'
					classNameInput='map_iin_input'
					id='iin'
					title='Иин'
					name='iin'
					type='tel'
					maxLength={12}
					required
					value={iin}
					onChange={handleChange}
				/>
				<ErrorSubMessage error={{ iin: { message: error } }} trait='iin' name='message' />
				<span className='map_iin_clear_button' role='button' tabIndex={0} onClick={handleClick} onKeyUp={handleKeyUp}>
					Очистить
				</span>
				<Button className='map_iin_button' type='submit'>
					Найти
				</Button>
			</form>
		</div>
	)
})

// const {
// 		register,
// 		watch,
// 		setValue,
// 		formState: { errors },
// 		handleSubmit
// 	} = useForm({
// 		mode: 'onChange',
// 		resolver: yupResolver(iinSchema)
// 	})
// 	const iin = watch('iin')

// 	useEffect(() => {
// 		if (iin !== '' && !Number(iin)) {
// 			if (parseInt(iin)) {
// 				(async () => {
// 					console.log('request')
// 					await findByIin(iin)
// 				})()
// 			}
// 			setValue('iin', parseInt(iin) ? parseInt(iin) : '')
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [iin])
