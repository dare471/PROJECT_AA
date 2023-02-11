import { extendTheme, ThemeConfig } from '@chakra-ui/react'

export const breakpoints = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
}

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
}

export const theme = extendTheme({
	breakpoints,
	config,
})
