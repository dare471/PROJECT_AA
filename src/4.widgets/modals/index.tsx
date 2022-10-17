import { FC, memo } from 'react'
import { Modal } from '@/4.widgets/modals/modal'
import { IModalsProps } from './types'

export const Modals: FC<IModalsProps> = memo(({ modal, setModal, ...props }) => {
	return (
		<>
			{modal && (
				<>
					{modal.type === 'error' && <Modal.ErrorModal error={modal.data.error} setModal={setModal} {...props} />}
					{modal.type === 'confirm' && (
						<Modal.ConfirmModal
							message={modal.data.message}
							onClickAccept={modal.data.onClickAccept}
							onClickReject={modal.data.onClickReject}
							setModal={setModal}
							{...props}
						/>
					)}
					{modal.type === 'comment' && (
						<Modal.CommentModal
							header={modal.data.header}
							info={modal.data.info}
							index={modal.data.index}
							setModal={setModal}
							{...props}
						/>
					)}
				</>
			)}
		</>
	)
})
