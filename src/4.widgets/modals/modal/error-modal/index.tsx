import { TSetState } from '@/7.shared/lib/react'
import { Modal } from '@/7.shared/ui'

import { TModals } from '../..'
import './styles.scss'

type TErrorModalProps = {
	error: any
	setModal: TSetState<TModals | undefined>
}

export const ErrorModal = (props: TErrorModalProps) => {
	const { error, setModal } = props

	//FIXME: remove redundancy
	return (
		<>
			{error && (
				<Modal modalClassName='error_modal' onClick={() => setModal(undefined)}>
					<div className='error_modal_content'>{error}</div>
				</Modal>
			)}
		</>
	)
}
