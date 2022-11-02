import { memo, useEffect } from 'react'

import { useLockedBody } from '@/7.shared/lib/browser'
import { scrollToTop } from '@/7.shared/lib/dom'
import { TSetState } from '@/7.shared/lib/react'

import { CommentModal, ConfirmModal, ErrorModal } from './modal'

export type TModalType = 'error' | 'comment' | 'confirm'

export type TModals = {
	type: TModalType
	data: any
}

type TModalsProps = {
	modal?: TModals
	setModal: TSetState<TModals | undefined>
}

const _Modals = (props: TModalsProps) => {
	const { modal, setModal, ...otherProps } = props
	const [locked, setLocked] = useLockedBody()

	useEffect(() => {
		if (modal) {
			scrollToTop()
			setLocked(true)
		} else {
			setLocked(false)
		}
	}, [modal])

	return (
		<>
			{modal && (
				<>
					{modal.type === 'error' && <ErrorModal error={modal.data.error} setModal={setModal} {...otherProps} />}
					{modal.type === 'confirm' && (
						<ConfirmModal
							message={modal.data.message}
							onClickAccept={modal.data.onClickAccept}
							onClickReject={modal.data.onClickReject}
							setModal={setModal}
							{...otherProps}
						/>
					)}
					{modal.type === 'comment' && (
						<CommentModal
							header={modal.data.header}
							info={modal.data.info}
							index={modal.data.index}
							setModal={setModal}
							{...otherProps}
						/>
					)}
				</>
			)}
		</>
	)
}

export const Modals = memo(_Modals)
