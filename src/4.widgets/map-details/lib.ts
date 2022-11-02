export const getUniqDetails = <T>(details: T[]) => {
	return details.slice().reduce((prev: any, item: any) => {
		return prev.findIndex((prevItem: any) => prevItem.NAME === item.NAME) === -1 ? [...prev, item] : prev
	}, [])
}
