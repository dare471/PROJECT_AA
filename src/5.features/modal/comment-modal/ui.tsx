import { FC, useEffect } from 'react'
import { MapComment, MapCommentForm } from '@/6.entities/map-comment'
import { CommentApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'
import { Divider, Modal } from '@/7.shared/ui'
import { IMapCommentModalProps } from './types'
import './styles.scss'

export const CommentModal: FC<IMapCommentModalProps> = ({ header, info, index, setModal }) => {
	const [commentsMutation, abortComments] = useMutationCustom((id: any) => {
		return CommentApi.getCommentsById(id)
	})

	useEffect(() => {
		commentsMutation.mutate(info.FIELDS)

		return () => {
			abortComments.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Modal
			modalWrapperClassName='map_comment_modal_wrapper'
			modalClassName='map_comment_modal'
			closeClassName='map_comment_modal_close'
			onClick={() => setModal(null)}
		>
			<header className='map_comment_modal_item first'>
				<h3 className='map_comment_modal_header_title first'>{header.name}</h3>
				<h3 className='map_comment_modal_header_title second'>{header.address}</h3>
			</header>
			<Divider />
			<div className='map_comment_modal_item second'>
				<div className='map_comment_modal_info'>
					<h5>
						Номер
						<span>:</span>
					</h5>
					<h6>{index + 1}</h6>
				</div>
				<div className='map_comment_modal_info'>
					<h5>
						Кадастр
						<span>:</span>
					</h5>
					<h6>{info.KADASTR}</h6>
				</div>
				<div className='map_comment_modal_info'>
					<h5>
						Като
						<span>:</span>
					</h5>
					<h6>{info.CATO}</h6>
				</div>
				<div className='map_comment_modal_info'>
					<h5>
						Площадь
						<span>:</span>
					</h5>
					<h6>{info.AREA}</h6>
				</div>
			</div>
			<Divider />
			<div className='map_comment_modal_item third'>
				<div className='map_comment_modal_comment_header'>
					<h4>Оставить Комментарий</h4>
				</div>
				<MapCommentForm id={info.FIELDS} commentsMutation={commentsMutation} />
			</div>
			<div className='map_comment_modal_item fourth'>
				<MapComment id={info.FIELDS} data={commentsMutation.data} />
			</div>
		</Modal>
	)
}
