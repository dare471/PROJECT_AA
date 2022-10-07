import { polygonApi } from '@/7.shared/api'

type getForAllPolygonsReturn = {
	res: any
	resType: string
}

export const getForAllPolygons = async (type: string, id: string, fetch: any): Promise<getForAllPolygonsReturn> => {
	const controller = new AbortController()
	try {
		if (type === 'region') {
			const res = await polygonApi.getDistrictPolygons({ id, signal: controller.signal })
			return { res, resType: 'region' }
		} else if (type === 'district') {
			const res = await polygonApi.getPolygons({ id, signal: controller.signal })
			return { res, resType: 'district' }
		} else if (type === 'polygon') {
			const res = await polygonApi.getClientInfo({ id, signal: controller.signal })
			return { res, resType: 'polygon' }
		} else if (type === 'polygonDetail') {
			const res = await polygonApi.getPolygonDetails({ id, signal: controller.signal })
			return { res, resType: 'polygonDetail' }
		} else {
			return { res: null, resType: 'nothing' }
		}
	} catch (err) {
		throw err
	}
}
