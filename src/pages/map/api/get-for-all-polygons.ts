import { getClientInfo, getDistrictPolygon, getPolygonDetail, getPolygons } from '@/shared/api'

type getForAllPolygonsReturn = {
	res: any
	resType: string
}

export const getForAllPolygons = async (type: string, id: string): Promise<getForAllPolygonsReturn> => {
	try {
		if (type === 'region') {
			console.log('handle region')
			const res = await getDistrictPolygon(id)
			return { res, resType: 'region' }
		} else if (type === 'district') {
			console.log('handle district')
			const res = await getPolygons(id)
			return { res, resType: 'district' }
		} else if (type === 'polygon') {
			const res = await getClientInfo(id)
			return { res, resType: 'polygon' }
		} else if (type === 'polygonDetail') {
			const res = await getPolygonDetail(id)
			return { res, resType: 'polygonDetail' }
		} else {
			return { res: null, resType: 'nothing' }
		}
	} catch (err) {
		throw err
	}
}
