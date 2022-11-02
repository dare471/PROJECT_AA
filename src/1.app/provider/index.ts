import compose from 'compose-function'

import { withQueryClient } from './with-query-client'
import { withQueryParams } from './with-query-params'
import { withReduxPersist } from './with-redux-persist'
import { withRouter } from './with-router'
import { withStore } from './with-store'

export const withProvider = compose(withStore, withReduxPersist, withRouter, withQueryParams, withQueryClient)
