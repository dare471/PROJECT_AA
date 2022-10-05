import { FC } from 'react'
import { IMapCommentItemProps } from './types'
import './styles.scss'

export const MapCommentItem: FC<IMapCommentItemProps> = ({ data, index, style }) => {
	return (
		<section className='map_comment_item' style={{ ...style, top: style.top + 10, height: style.height - 10 }}>
			<header className='map_comment_item_header'>
				<h4 className='map_comment_item_title'>Author</h4>
				<h6 className='map_comment_item_text'>{data[index].CREATED_BY}</h6>
			</header>
			<article className='map_comment_item_content'>
				<h4 className='map_comment_item_title'>Comment</h4>
				<h6 className='map_comment_item_text'>{data[index].DESCRIPTION}</h6>
			</article>
		</section>
	)
}
