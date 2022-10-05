import { FC } from 'react'
import { Modal } from '@/shared/ui'
import { IErrorModalProps } from './types'
import './styles.scss'

export const ErrorModal: FC<IErrorModalProps> = ({ error, setModal }) => {
	return (
		<>
			{error && (
				<Modal modalClassName='error_modal' onClick={() => setModal(null)}>
					<div className='error_modal_content'>{error}</div>
				</Modal>
			)}
		</>
	)
}
