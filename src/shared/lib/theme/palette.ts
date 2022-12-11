import { css } from 'styled-components'

// because of createPaletteApi function (which was created to automate custom
// properties creation) ts cannot output types. in the result we don't have
// autocomplete in the theme usage. to fix it we have to describe types like so.
type PrimaryKeys =
	| keyof typeof paletteObject.primary
	| 'primary'
	| 'primaryDisabled'
	| 'primaryHover'
	| 'primaryPressed'
type SecondaryKeys =
	| keyof typeof paletteObject.secondary
	| 'secondary'
	| 'secondaryDisabled'
	| 'secondaryHover'
	| 'secondaryPressed'
type SuccessKeys =
	| keyof typeof paletteObject.success
	| 'success'
	| 'successDisabled'
	| 'successHover'
	| 'successPressed'
type WarningKeys =
	| keyof typeof paletteObject.warning
	| 'warning'
	| 'warningDisabled'
	| 'warningHover'
	| 'warningPressed'
type DangerKeys =
	| keyof typeof paletteObject.danger
	| 'danger'
	| 'dangerDisabled'
	| 'dangerHover'
	| 'dangerPressed'
type InfoKeys =
	| keyof typeof paletteObject.info
	| 'info'
	| 'infoDisabled'
	| 'infoHover'
	| 'infoPressed'
type BnwKeys = keyof typeof paletteObject.bnw | 'bnw' | 'bnwDisabled' | 'bnwHover' | 'bnwPressed'
type AllKeys =
	| PrimaryKeys
	| SecondaryKeys
	| SuccessKeys
	| WarningKeys
	| DangerKeys
	| InfoKeys
	| BnwKeys

// in case of modifying the palette you can only modify this object
// without modifying the rest
const paletteObject = {
	primary: {
		primary1000: '#DBE9FA',
		primary900: '#B8D3F5',
		primary800: '#94BDF0',
		primary700: '#70A7EB',
		primary600: '#4C91E6',
		primary500: '#297BE0',
		primary400: '#1C68C4',
		primary300: '#1755A1',
		primary200: '#12427D',
		primary100: '#0D2F59',
		primary50: '#081C36',
		primary0: '#030912'
	},
	secondary: {
		secondary1000: '#E1F4EB',
		secondary900: '#C3E9D7',
		secondary800: '#A6DEC4',
		secondary700: '#88D3B0',
		secondary600: '#6AC89C',
		secondary500: '#4CBD88',
		secondary400: '#3DA474',
		secondary300: '#32865F',
		secondary200: '#27684A',
		secondary100: '#1C4A35',
		secondary50: '#112D20',
		secondary0: '#060F0B'
	},
	success: {
		success1000: '#DDF8E9',
		success900: '#BBF2D3',
		success800: '#99EBBE',
		success700: '#77E4A8',
		success600: '#55DD92',
		success500: '#33D77C',
		success400: '#25BB69',
		success300: '#1E9956',
		success200: '#187743',
		success100: '#115530',
		success50: '#0A331D',
		success0: '#03110A'
	},
	warning: {
		warning1000: '#FFEAD6',
		warning900: '#FFD5AD',
		warning800: '#FFC085',
		warning700: '#FFAB5C',
		warning600: '#FF9633',
		warning500: '#FF810A',
		warning400: '#E06C00',
		warning300: '#B85900',
		warning200: '#8F4500',
		warning100: '#663100',
		warning50: '#3D1E00',
		warning0: '#140A00'
	},
	danger: {
		danger1000: '#FBDBDB',
		danger900: '#F6B6B6',
		danger800: '#F29292',
		danger700: '#ED6E6E',
		danger600: '#E94949',
		danger500: '#E42525',
		danger400: '#C81919',
		danger300: '#A31414',
		danger200: '#7F1010',
		danger100: '#5B0B0B',
		danger50: '#360707',
		danger0: '#120202'
	},
	info: {
		info1000: '#D6FBFF',
		info900: '#ADF7FF',
		info800: '#85F3FF',
		info700: '#5CEFFF',
		info600: '#33EBFF',
		info500: '#0AE7FF',
		info400: '#00CAE0',
		info300: '#00A5B8',
		info200: '#00818F',
		info100: '#005C66',
		info50: '#00373D',
		info0: '#001214'
	},
	bnw: {
		bnw1000: '#FFFFFF',
		bnw950: '#F5F5F5',
		bnw900: '#EBEBEB',
		bnw850: '#CCCCCC',
		bnw800: '#C2C2C2',
		bnw750: '#B8B8B8',
		bnw700: '#ADADAD',
		bnw650: '#A3A3A3',
		bnw600: '#999999',
		bnw550: '#8F8F8F',
		bnw500: '#858585',
		bnw450: '#7A7A7A',
		bnw400: '#707070',
		bnw350: '#666666',
		bnw300: '#5C5C5C',
		bnw250: '#525252',
		bnw200: '#474747',
		bnw150: '#3D3D3D',
		bnw100: '#1F1F1F',
		bnw50: '#141414',
		bnw0: '#0A0A0A'
	}
}

function arrayToCssVar([key, value]: [key: string, value: string]) {
	return `--${key}: ${value};`
}

export const paletteProps = css`
	:root {
		${Object.keys(paletteObject).map((subPaletteName) => {
			type CustomPropsObjectKeys = keyof typeof paletteObject
			const _subPaletteName = subPaletteName as CustomPropsObjectKeys
			return Object.entries(paletteObject[_subPaletteName] as unknown as [string, string]).map(
				arrayToCssVar
			)
		})}
	}
`

function createPaletteApi(props: Record<string, string>) {
	const apiKeys = Object.keys(props).map((key) => [key, `--${key}`])
	const subPaletteName = Object.keys(props)[0].replace(/\d+$/, '')
	apiKeys.push([subPaletteName, `--${subPaletteName}600`])
	apiKeys.push([`${subPaletteName}Disabled`, `--${subPaletteName}800`])
	apiKeys.push([`${subPaletteName}Hover`, `--${subPaletteName}500`])
	apiKeys.push([`${subPaletteName}Pressed`, `--${subPaletteName}300`])
	return Object.fromEntries(apiKeys)
}

const primaryApi = createPaletteApi(paletteObject.primary)
const secondaryApi = createPaletteApi(paletteObject.secondary)
const successApi = createPaletteApi(paletteObject.success)
const warningApi = createPaletteApi(paletteObject.warning)
const dangerApi = createPaletteApi(paletteObject.danger)
const infoApi = createPaletteApi(paletteObject.info)
const bnwApi = createPaletteApi(paletteObject.bnw)

export const palette: Record<AllKeys, string> = {
	...primaryApi,
	...secondaryApi,
	...successApi,
	...warningApi,
	...dangerApi,
	...infoApi,
	...bnwApi
}
