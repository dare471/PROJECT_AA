import { FC, PropsWithChildren } from 'react'
import { Main } from '@/7.shared/ui'

export const ProfileTemplate: FC<PropsWithChildren> = ({ children }) => {
	return <Main>{children}</Main>
}
