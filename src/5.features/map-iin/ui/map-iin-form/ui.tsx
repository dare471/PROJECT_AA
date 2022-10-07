import { FC, memo, useEffect, useState } from 'react'
import { polygonApi } from '@/7.shared/api'
import { Button, ErrorMessage } from '@/7.shared/ui'
import { TextField } from '@/7.shared/ui/textfield'
import { IMapIinFormProps } from './types'
import './styles.scss'

// const iinSchema = yup.object().shape({
// 	iin: yup
// 		.string()
// 		.matches(/^[0-9]{12}$/gi, 'Must be equal 12 digits')
// 		.required('Required')
// })

export const MapIinForm: FC<IMapIinFormProps> = memo(
	({ mutationCoincideIin, abortCoincideIin, select, handleChangeCurrentPolygon }) => {
		const [iin, setIin] = useState<number | ''>('')
		const [error, setError] = useState<string | null>(null)

		useEffect(() => {
			setError(prev => {
				const strIin = String(iin)
				if (strIin.length < 12 && strIin.length > 0) {
					return 'You need to write 12 digits'
				}

				return null
			})
			let timeout: any
			mutationCoincideIin.reset()
			if (iin !== '' && (!select || (select && select['IIN_BIN'] !== iin))) {
				timeout = setTimeout(async () => {
					mutationCoincideIin.mutate(iin)
				}, 500)
			}

			return () => {
				clearTimeout(timeout)
				abortCoincideIin.current?.abort()
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [iin])

		useEffect(() => {
			if (select) {
				setIin(select['IIN_BIN'])
			}
		}, [select])

		const onSubmit = async (e: any) => {
			e.preventDefault()
			try {
				if (String(iin).length === 12) {
					handleChangeCurrentPolygon('polygon', mutationCoincideIin.data[0]['CLIENT_ID'], ['request'])
				}
			} catch (err) {
				setIin('')
				mutationCoincideIin.reset()
				console.log('Error from map-iin-form')
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
					<ErrorMessage errors={{ iin: { message: error } }} name='iin' prop='message' />
					<span className='map_iin_clear_button' role='button' tabIndex={0} onClick={handleClick} onKeyUp={handleKeyUp}>
						Очистить
					</span>
					<Button className='map_iin_button' type='submit'>
						Найти
					</Button>
				</form>
			</div>
		)
	}
)

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
