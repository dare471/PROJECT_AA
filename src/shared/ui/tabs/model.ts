import { createEvent, createStore } from 'effector'

interface CreateTabsOptions<T extends Record<string, number>> {
	defaultTab: number
	tabs: T
}

export function createTabs<T extends Record<string, number>>(options: CreateTabsOptions<T>) {
	const { defaultTab, tabs } = options

	const tabChanged = createEvent<number | keyof T>()

	const $tab = createStore<number>(defaultTab)

	$tab.on(tabChanged, (_, tab) => {
		if (typeof tab === 'number') {
			return tab
		} else {
			return tabs[tab]
		}
	})

	return { tabChanged, $tab }
}
