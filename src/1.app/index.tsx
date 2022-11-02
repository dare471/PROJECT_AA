import './index.scss'
import { withProvider } from './provider'
import { Routing } from './routes'

const App = () => {
	return <Routing />
}

export default withProvider(App)
