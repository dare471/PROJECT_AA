export const calculateCenter = (polygon: any, zoom: number) => {
	const maxY = polygon[0].GEOMETRY_RINGS[0]
		.slice()
		.reduce((prev: any, item: any) => (prev === null ? item[0] : Math.max(prev, item[0])), null)
	const minY = polygon[0].GEOMETRY_RINGS[0]
		.slice()
		.reduce((prev: any, item: any) => (prev === null ? item[0] : Math.min(prev, item[0])), null)
	const maxX = polygon[0].GEOMETRY_RINGS[0]
		.slice()
		.reduce((prev: any, item: any) => (prev === null ? item[1] : Math.max(prev, item[1])), null)
	const minX = polygon[0].GEOMETRY_RINGS[0]
		.slice()

		.reduce((prev: any, item: any) => (prev === null ? item[1] : Math.min(prev, item[1])), null)
	const newPosition = [minX, minY]
	return { x: newPosition[0], y: newPosition[1], zoom }
}
