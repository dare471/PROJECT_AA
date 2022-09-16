import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { DefaultLayout } from '@/layouts/default '
import { ROUTE_TO_MAP } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Section } from '@/shared/ui/section'
import './styles.scss'

export const HomePage = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const handleClick = () => {
		searchParams.set('illustrate', 'area')
		navigate({ pathname: ROUTE_TO_MAP(), search: `${searchParams}` })
	}

	return (
		<DefaultLayout>
			<main>
				<Section>
					<div>
						<span>Home</span>
						<Button
							style={{ backgroundColor: 'red', fontSize: 15, padding: 10 }}
							onClick={handleClick}
						>
							Go To Map
						</Button>
					</div>
				</Section>
			</main>
		</DefaultLayout>
	)
}
