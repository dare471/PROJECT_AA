import { TCustomAxiosResponse, TParams } from '../types'

import { instance } from './base'

class _ElevatorApi {
	async getElevatorMarkers({ signal }: TParams): Promise<any> {
		const { data: resData }: TCustomAxiosResponse<any> = await instance({
			method: 'GET',
			url: '/elevatorMarker',
			signal
		})

		return resData.data
	}
}

export const ElevatorApi = new _ElevatorApi()
