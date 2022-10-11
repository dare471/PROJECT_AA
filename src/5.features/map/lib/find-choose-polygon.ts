export const findChoosePolygon = (parent: any, id: any) => {
	const result = [
		parent.find((item: any) => {
			return item.KATO === id || item.CLIENT_INFO_ID === id || item.ID === id
		})
	]

	return result
}
