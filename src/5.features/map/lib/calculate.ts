export const calculateCenter = (polygon: any) => {
	// const maxY = polygon[0].geometry_rings[0]
	// 	.slice()
	// 	.reduce((prev: any, item: any) => (prev === null ? item[0] : Math.max(prev, item[0])), null)
	const minY = polygon.geometry_rings[0]
		.slice()
		.reduce((prev: any, item: any) => (prev === null ? item[0] : Math.min(prev, item[0])), null)
	// const maxX = polygon[0].geometry_rings[0]
	// 	.slice()
	// 	.reduce((prev: any, item: any) => (prev === null ? item[1] : Math.max(prev, item[1])), null)
	const minX = polygon.geometry_rings[0]
		.slice()
		.reduce((prev: any, item: any) => (prev === null ? item[1] : Math.min(prev, item[1])), null)
	const newPosition = [minX, minY]
	return { x: newPosition[0], y: newPosition[1] } as const
}
