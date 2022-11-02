import { HTMLProps, ReactNode, useEffect } from 'react'

import { MapCommentForm } from '@/5.features/comment'

import { MapComments, useFetchMapComment } from '@/6.entities/map-comment'

import { TSetState } from '@/7.shared/lib/react'
import { Divider, Modal } from '@/7.shared/ui'

import { TModals } from '../..'
import './styles.scss'

type TMapCommentModalProps = {
	header: any
	info: any
	index: number
	setModal: TSetState<TModals | undefined>
}

export const CommentModal = (props: TMapCommentModalProps) => {
	const { header, info, index, setModal } = props

	const [mapCommentsMutation, abortMapComments] = useFetchMapComment()
	console.log(info)

	useEffect(() => {
		mapCommentsMutation.mutate(info.id)
		console.log(info.id)

		return () => {
			abortMapComments.current?.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//FIXME: remove redundancy
	return (
		<Modal
			modalWrapperClassName='comment_modal_wrapper'
			modalClassName='comment_modal'
			closeClassName='comment_modal_close'
			onClick={() => setModal(undefined)}
		>
			<CommentModalItem className='first' as='header'>
				<CommentModalHeader name={header.name} address={header.address} />
			</CommentModalItem>
			<Divider />
			<CommentModalItem className='second'>
				<CommentModalDetails
					title={
						<>
							Номер
							<span>:</span>
						</>
					}
					text={index + 1}
				/>
				<CommentModalDetails
					title={
						<>
							Кадастр
							<span>:</span>
						</>
					}
					text={info.kadastr}
				/>
				<CommentModalDetails
					title={
						<>
							Като
							<span>:</span>
						</>
					}
					text={info.cato}
				/>
				<CommentModalDetails
					title={
						<>
							Площадь
							<span>:</span>
						</>
					}
					text={info.area}
				/>
			</CommentModalItem>

			<Divider />
			<CommentModalItem className='fourth'>
				<div className='comment_modal_comment_header'>
					<h4>Оставить Комментарий</h4>
				</div>
				<MapCommentForm mapCommentsMutation={mapCommentsMutation} id={info.id} />
			</CommentModalItem>

			<CommentModalItem className='fives'>
				<MapComments data={mapCommentsMutation.data} loading={mapCommentsMutation.isLoading} id={info.id} />
			</CommentModalItem>
		</Modal>
	)
}

type TCommentModalItemProps = {
	children: ReactNode
} & HTMLProps<HTMLDivElement>

const CommentModalItem = ({ className, children, ...otherProps }: TCommentModalItemProps) => (
	<div className={`comment_modal_item${className ? ' ' + className : ''}`} {...otherProps}>
		{children}
	</div>
)

type TCommentModalHeaderProps = {
	name: string
	address: string
}

const CommentModalHeader = ({ name, address }: TCommentModalHeaderProps) => (
	<>
		<h3 className='comment_modal_header_title first'>{name}</h3>
		<h3 className='comment_modal_header_title second'>{address}</h3>
	</>
)

type TCommentModalDetailsProps = {
	title: ReactNode
	text: ReactNode
}

const CommentModalDetails = ({ title, text }: TCommentModalDetailsProps) => (
	<div className='comment_modal_details'>
		<h3 className='comment_modal_details_title'>{title}</h3>
		<h6 className='comment_modal_details_text'>{text}</h6>
	</div>
)
