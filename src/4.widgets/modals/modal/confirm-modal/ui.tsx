import { FC } from 'react'
import { Modal } from '@/7.shared/ui'
import { IConfirmModalProps } from './types'

export const ConfirmModal: FC<IConfirmModalProps> = ({ message, onClickAccept, onClickReject, setModal }) => {
	return (
		<Modal onClick={() => setModal(null)}>
			<div className=''>
				<div>{message}</div>
				<div>
					<button onClick={onClickAccept}>Accept</button>
					<button onClick={onClickReject}>Reject</button>
				</div>
			</div>
		</Modal>
	)
}
