import { FC, memo } from 'react'
import { ErrorModal } from '@/5.features/error-modal'
import { MapCommentModal } from '@/5.features/map-comment-modal'
import { IMapModals } from './types'

export const MapModals: FC<IMapModals> = memo(({ modal, setModal, ...props }) => {
	return (
		<>
			{modal && (
				<>
					{modal.type === 'error' && <ErrorModal error={modal.data.error} setModal={setModal} {...props} />}
					{modal.type === 'comment' && (
						<MapCommentModal
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
