import { ReactNode, useEffect } from 'react'
import { useParams } from 'react-router'

import { UserCard } from '@/6.entities/user'

import { UserApi } from '@/7.shared/api'
import { useTitle } from '@/7.shared/lib/dom'
import { useMutationCustom } from '@/7.shared/lib/react-query'
import { Article, Card, Container, Divider } from '@/7.shared/ui'

import './styles.scss'

export const ProfilePage = () => {
	useTitle('Profile')
	const { id: userId } = useParams()
	const [userInfoMutation, abortUserInfo] = useMutationCustom((signal, id: any) => UserApi.getUserInfo(id))

	useEffect(() => {
		userInfoMutation.mutate(userId)
	}, [])

	return (
		<ProfileSection className='profile_section'>
			<Container>
				<Article className='profile_article'>
					<ProfileSection className='first'>
						<UserCard className='profile_item_card' data={userInfoMutation.data} loading={userInfoMutation.isLoading} />
					</ProfileSection>
					<Divider className='profile_divider first' />

					<ProfileSection className='second'>
						<Card className='profile_item_card'>
							<h6>Клиенты</h6>
							<Divider />
						</Card>
					</ProfileSection>

					<ProfileSection className='third'>
						<Card className='profile_item_card'>
							<h6>Мои договора</h6>
							<Divider />
						</Card>
					</ProfileSection>
				</Article>
			</Container>
		</ProfileSection>
	)
}

type TProfileSectionProps = {
	children: ReactNode
	className?: string
}

const ProfileSection = ({ className, children }: TProfileSectionProps) => (
	<section className={`profile_card_section${className ? ' ' + className : ''}`}>{children}</section>
)
