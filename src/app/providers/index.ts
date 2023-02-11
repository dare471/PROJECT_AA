import compose from 'compose-function'

import { withChakra } from './with-chakra'
import { withRouter } from './with-router'

export const withProviders = compose(withChakra, withRouter)
