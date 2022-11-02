export const getUniqDetails = <T extends object>(item: T[] | undefined): T[] | undefined => {
	if (item) {
		const result = item.reduce((prevItem: any, currentItem: any) => {
			if (currentItem?.client_info_id && !(currentItem.client_info_id in prevItem)) {
				return {
					...prevItem,
					[currentItem.client_info_id]: currentItem
				}
			}
			if (currentItem.CLIENT_INFO_ID && !(currentItem.CLIENT_INFO_ID in prevItem)) {
				return {
					...prevItem,
					[currentItem.CLIENT_INFO_ID]: currentItem
				}
			}

			return prevItem
		}, {})

		return Object.values(result)
	}

	return undefined
}
