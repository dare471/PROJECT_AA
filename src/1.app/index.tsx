import './index.scss'
import { withProvider } from './provider'
import { AppRouter } from './routes'

const App = () => {
	return <AppRouter />
}

export default withProvider(App)
