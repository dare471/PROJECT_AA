// import { memo } from 'react'

// import { MapCollapse } from '@/5.features/map-collapse'
// import { MapIin } from '@/5.features/map-iin'

// import { TDistrictPolygon, TPolygonType, TRegionPolygon } from '@/7.shared/api'
// import { TSetState } from '@/7.shared/lib/react'
// import { Article, Divider } from '@/7.shared/ui'

// import { LeftSidebarResetButton } from './button'
// import { LeftSidebarHeader } from './header'
// import './styles.scss'

// export type TListPolygons = {
// 	children?: TListPolygons[]
// } & (TRegionPolygon | TDistrictPolygon)

// type TMapPolygonsListProps = {
// 	listPolygons?: TListPolygons[]
// 	illustrate?: TPolygonType
// 	setIllustrate: TSetState<TPolygonType | undefined>
// 	handlePrev: any
// }

// export const MapPolygonsList = memo((props: TMapPolygonsListProps) => {
// 	const { listPolygons, illustrate, setIllustrate, handlePrev } = props

// 	const handleClick = () => {
// 		handlePrev()
// 	}

// 	return (
// 		<Article className='map_describe_article'>
// 			{listPolygons && (
// 				<MapCollapse listPolygons={listPolygons} illustrate={illustrate} setIllustrate={setIllustrate} />
// 			)}
// 		</Article>
// 	)
// })
