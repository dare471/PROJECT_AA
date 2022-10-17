import compose from 'compose-function'
import { withQueryClient } from './with-query-client'
import { withQueryParams } from './with-query-params'
import { withRouter } from './with-router'
import { withStore } from './with-store'

export const withProvider = compose(withStore, withRouter, withQueryParams, withQueryClient)
