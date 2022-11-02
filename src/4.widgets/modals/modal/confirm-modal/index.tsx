import { TSetState } from '@/7.shared/lib/react'
import { Modal } from '@/7.shared/ui'

import { TModals } from '../..'

type TConfirmModalProps = {
	message: string
	onClickAccept: () => void
	onClickReject: () => void
	setModal: TSetState<TModals | undefined>
}

export const ConfirmModal = (props: TConfirmModalProps) => {
	const { message, onClickAccept, onClickReject, setModal } = props

	//FIXME: remove redundancy
	return (
		<Modal onClick={() => setModal(undefined)}>
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
