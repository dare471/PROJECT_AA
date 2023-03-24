import { createEvent, createStore } from 'effector'

export interface Tab {
	index: number
	value: string
}

interface CreateTabsOptions<T extends string> {
	defaultTab: T | number
	tabs: T[]
}

export function createTabs<T extends string>(options: CreateTabsOptions<T>) {
	const { defaultTab, tabs } = options

	const tabChanged = createEvent<number | T>()

	const $tab = createStore<{ index: number; value: T }>(
		typeof defaultTab === 'number'
			? { index: defaultTab, value: tabs[defaultTab]! }
			: { index: tabs.indexOf(defaultTab), value: defaultTab },
	)

	$tab.on(tabChanged, (_, tab) => {
		if (typeof tab === 'number') {
			return { index: tab, value: tabs[tab]! }
		} else {
			return { index: tabs.indexOf(tab), value: tab }
		}
	})

	return { tabChanged, $tab }
}
