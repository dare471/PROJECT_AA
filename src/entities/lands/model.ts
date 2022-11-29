import { createStore } from 'effector'

import type { DistrictsRes, RegionsRes } from '~src/shared/api'
import { landsApi } from '~src/shared/api'

export const $regions = createStore<RegionsRes | null>(null)
export const $districtsRes = createStore<DistrictsRes | null>(null)

$regions.on(landsApi.getRegionsQuery.finished.success, (_, regionsRes) => regionsRes.data)
