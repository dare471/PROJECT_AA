import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserInfo } from '@/5.features/user'
import { UserApi } from '@/7.shared/api'
import { useMutationCustom } from '@/7.shared/lib'
import { Card, Container, Divider, Section } from '@/7.shared/ui'
import './styles.scss'
import { ProfileTemplate } from './template'

export const ProfilePage: FC = () => {
	const { id: userId } = useParams()
	const [userInfoMutation, abortUserInfo] = useMutationCustom((signal, id: any) => UserApi.getUserInfo(id))

	useEffect(() => {
		userInfoMutation.mutate(userId)
	}, [])

	return (
		<ProfileTemplate>
			<Section className='profile_section'>
				<Container>
					<Card className='profile_card'>
						<UserInfo data={userInfoMutation.data} isLoading={userInfoMutation.isLoading} />
						<Divider className='profile_divider first' />
						<div className='profile_item second'>
							<Card className='profile_item_card'>
								<Section className='profile_'>
									<h6>Клиенты</h6>
									<Divider />
								</Section>
							</Card>
						</div>
						<div className='profile_item third'>
							<Card className='profile_item_card'>
								<Section className='profile_'>
									<h6>Мои договора</h6>
									<Divider />
								</Section>
							</Card>
						</div>
					</Card>
				</Container>
			</Section>
		</ProfileTemplate>
	)
}
