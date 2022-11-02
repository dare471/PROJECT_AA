import { CSSProperties, ReactNode } from 'react'

import './styles.scss'

type TMapCommentProps = {
	data: any
	index: number
	style: CSSProperties
}

//FIXME: remove redundancy
export const MapComment = (props: TMapCommentProps) => {
	const { data, index, style } = props
	console.log(data)

	return (
		<section
			className='map_comment_item'
			style={{ ...style, top: parseFloat(`${style.top}`) + 10, height: parseFloat(`${style.height}`) - 10 }}
		>
			<header className='map_comment_item_header'>
				<div className='map_comment_item_header_item'>
					<MapCommentTitle title='Author' />
					<MapCommentText text={data.CREATED_BY} />
				</div>
				<div className='map_comment_item_header_item'>
					<MapCommentText text={data.CREATED_TIME} />
				</div>
			</header>
			<article className='map_comment_item_content'>
				<MapCommentText text={data.DESCRIPTION} />
			</article>
		</section>
	)
}

type TMapCommentTitleProps = {
	title: string
}

const MapCommentTitle = ({ title }: TMapCommentTitleProps) => <h3 className='map_comment_title'>{title}</h3>

type TMapCommentTextProps = {
	text: string
}

const MapCommentText = ({ text }: TMapCommentTextProps) => <h6 className='map_comment_text'>{text}</h6>
