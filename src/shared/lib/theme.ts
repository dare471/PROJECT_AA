import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

export const breakpoints = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
}

export const zIndices = {
	hide: -1,
	auto: 'auto',
	base: 0,
	docked: 10,
	header: 500,
	map: 300,
	dropdown: 1000,
	sticky: 1100,
	fixed: 1200,
	overlay: 1300,
	modal: 1400,
	popover: 1500,
	skipLink: 1600,
	toast: 1700,
	tooltip: 1800,
}

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
}

export const theme = extendTheme({
	breakpoints,
	config,
	zIndices,
})
