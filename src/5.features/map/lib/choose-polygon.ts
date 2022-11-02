import { TDistrictPolygon, TPolygon } from '@/7.shared/api'

export const getChoosePolygon = (
	parent: TDistrictPolygon[] | null,
	id: number | null | undefined
): TPolygon[] | null => {
	if (parent && id) {
		const result =
			parent.find(item => {
				return Number(item.cato) === id
			}) || null

		return [result as TPolygon]
	}

	return null
}
