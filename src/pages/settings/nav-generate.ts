export type NavItem = {
	label: string
	key: string
	icon?: React.ReactNode
	protects?: Array<() => boolean>
	route?: (...args: unknown[]) => string
	children?: NavItem[]
}

export function navItemsGenerate(items: Array<NavItem>): Array<NavItem> {
	return items.filter((item) => {
		if (item.protects) {
			const boolProtects = item.protects.map((protect) => protect())
			return boolProtects.every((protect) => protect === true)
		}

		return true
	})
}
