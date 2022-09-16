import { withProvider } from '@/app/provider'
import { AppRouter } from '@/pages'
import './index.scss'

const App = () => {
  return (
    <AppRouter />
  )
}

export default withProvider(App)