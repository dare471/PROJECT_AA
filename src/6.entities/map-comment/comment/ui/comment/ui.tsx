import { FC, forwardRef } from 'react'
import { FixedSizeList as List } from 'react-window'
import { IMapCommentProps } from './types'
import { MapCommentItem } from '../comment-item'
import './styles.scss'

export const MapComment: FC<IMapCommentProps> = ({ id, data }) => {
	return (
		<div className='map_comment'>
			{data && (
				<List
					width='100%'
					height={300}
					itemSize={80}
					itemData={data}
					itemCount={data.length}
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
