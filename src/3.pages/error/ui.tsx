import { useLocation } from 'react-router'
import './styles.scss'

export const ErrorPage = () => {
	const location = useLocation()
	console.log(location)

	return <div>404 Error</div>
}
