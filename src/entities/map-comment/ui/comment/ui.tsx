import { FC, forwardRef, useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { getCommentsById } from '@/shared/api'
import { IMapCommentProps } from './types'
import { MapCommentItem } from '../comment-item'
import './styles.scss'

export const MapComment: FC<IMapCommentProps> = ({ id, update }) => {
	const [comments, setComments] = useState<any>(null)

	useEffect(() => {
		;(async () => {
			try {
				const res = await getCommentsById(id)
				setComments(res)
			} catch (err) {
				console.log(err)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update])

	return (
		<div className='map_comment'>
			{comments && (
				<List
					width='100%'
					height={300}
					itemSize={80}
					itemData={comments}
					itemCount={comments.length}
					innerElementType={ListInnerElement}
				>
					{({ data, index, style }) => <MapCommentItem data={data} index={index} style={style} />}
				</List>
			)}
		</div>
	)
}

const ListInnerElement = forwardRef<any, any>(({ style, ...rest }, ref) => {
	return <div className='map_comment_list_inner' ref={ref} style={{ ...style, paddingBlockEnd: 10 }} {...rest} />
})
