import { Tab, TabProps } from 'react-tabs'

import './styles.scss'

export const CustomTab = (props: TabProps) => {
	const { className, disabledClassName, selectedClassName, children, ...otherProps } = props

	return (
		<Tab
			className={`map_tab${className ? ' ' + className : ''}`}
			disabledClassName={`map_tab_disabled${disabledClassName ? ' ' + disabledClassName : ''}`}
			selectedClassName={`map_tab_selected${selectedClassName ? ' ' + selectedClassName : ''}`}
			{...otherProps}
		>
			<h1>{children}</h1>
		</Tab>
	)
}

CustomTab.tabsRole = 'Tab'
