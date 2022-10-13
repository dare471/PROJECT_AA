import { FC, PropsWithChildren } from 'react'
import { Main } from '@/7.shared/ui'
import './styles.scss'

export const MapTemplate: FC<PropsWithChildren> = ({ children }) => {
	return <Main className='map_main'>{children}</Main>
}
