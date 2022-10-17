import { FC, memo } from 'react'
import { useQueryParam } from 'use-query-params'
import { Templates } from '@/4.widgets/templates'
import { Article, Card } from '@/7.shared/ui'
import { IMapRightSidebarProps } from './types'
import './styles.scss'

export const MapRightSidebar: FC<IMapRightSidebarProps> = memo(({ clientInfo, setModal, setIllustrate }) => {
	const [clientPolygonQP, setClientPolygonQP] = useQueryParam('clientPolygon')

	const handleClickView = (item: any) => {
		setIllustrate('clientPolygon')
		setClientPolygonQP(item.ID)
	}

	const handleKeyUpView = (e: any, item: any) => {
		if (e.key === 'Enter') {
			setIllustrate('clientPolygon')
			setClientPolygonQP(item.ID)
		}
	}

	const handleClickComment = (item: any, index: number) => {
		setIllustrate('clientPolygon')
		setClientPolygonQP(item.ID)

		setModal({
			type: 'comment',
			data: { header: { name: clientInfo?.header.NAME, address: clientInfo?.header.ADDRESS }, info: item, index }
		})
	}

	const handleKeyUpComment = (e: any, item: any, index: number) => {
		if (e.key === 'Enter') {
			setIllustrate('clientPolygon')
			setClientPolygonQP(item.ID)

			setModal({
				type: 'comment',
				data: { header: { name: clientInfo?.header.NAME, address: clientInfo?.header.ADDRESS }, info: item, index }
			})
		}
	}

	return (
		<>
			<Templates.Sidebar data={clientInfo}>
				{clientInfo?.data && (
					<>
						<header className='map_info_sidebar_header'>
							<h3 className='map_info_sidebar_header_title first'>{clientInfo.header.NAME}</h3>
							<h3 className='map_info_sidebar_header_title second'>{clientInfo.header.ADDRESS}</h3>
						</header>
						<Article className='map_info_sidebar_article'>
							{clientInfo.data.map((item: any, index: number) => (
								<Card
									key={`${item}-${index}`}
									className={`map_info_sidebar_card${clientPolygonQP === item.ID ? ' active' : ''}`}
								>
									<div className='map_info_sidebar_item first'>
										<span>{index + 1}.</span>
									</div>

									<div className='map_info_sidebar_item second'>
										<div className='map_info_sidebar_data first'>
											<h5 className='title'>Тип:</h5>
											<span className='data'>{item.TYPE}</span>
										</div>
										<div className='map_info_sidebar_data second'>
											<h5 className='title'>Като:</h5>
											<span className='data'>{item.CATO}</span>
										</div>
										<div className='map_info_sidebar_data third'>
											<h5 className='title'>Кадастр:</h5>
											<span className='data'>{item.KADASTR}</span>
										</div>
										<div className='map_info_sidebar_data fourth'>
											<h5 className='title'>Площадь:</h5>
											<span className='data'>{item.AREA}</span>
										</div>
										<div className='map_info_sidebar_data fifth'>
											<span
												className='data'
												role='button'
												tabIndex={0}
												onClick={() => handleClickView(item)}
												onKeyUp={e => handleKeyUpView(e, item)}
											>
												Посмотреть
											</span>
											<span
												className='data'
												role='button'
												tabIndex={0}
												onClick={() => handleClickComment(item, index)}
												onKeyUp={e => handleKeyUpComment(e, item, index)}
											>
												Коментарий
											</span>
										</div>
									</div>
								</Card>
							))}
						</Article>
					</>
				)}
			</Templates.Sidebar>
		</>
	)
})
