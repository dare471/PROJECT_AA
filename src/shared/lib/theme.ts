import { css } from 'styled-components'

// in case of modifying the palette you can only modify this object
// without modifying the rest
const customPropsObject = {
	//primary
	primary: {
		primary1000: '#000',
		primary900: '#203D57',
		primary800: '#284E6E',
		primary700: '#33628B',
		primary600: '#3D76A7',
		primary500: '#4A90CC',
		primary400: '#70AADC',
		primary300: '#96C1E5',
		primary200: '#BDD8EF',
		primary100: '#E4EFF8',
		primary50: '#F7FAFD',
		primary0: '#fff'
	},
	notice: {
		notice1000: '#000',
		notice900: '#75131d',
		notice800: '#931824',
		notice700: '#b81e2d',
		notice600: '#db2638',
		notice500: '#e55e6c',
		notice400: '#eb8791',
		notice300: '#f1a9b0',
		notice200: '#f6c9ce',
		notice100: '#fbe9eb',
		notice50: '#fef9f9',
		notice0: '#fff'
	},
	success: {
		success1000: '#000',
		success900: '#114420',
		success800: '#165629',
		success700: '#1b6d34',
		success600: '#21833e',
		success500: '#289f4c',
		success400: '#2fbc59',
		success300: '#52d479',
		success200: '#98e5af',
		success100: '#d7f5e0',
		success50: '#f3fcf6',
		success0: '#fff'
	},
	// black and white
	bnw: {
		bnw1000: '#000',
		bnw950: '#050506',
		bnw900: '#0c0c0e',
		bnw850: '#151519',
		bnw800: '#212027',
		bnw750: '#2f2e38',
		bnw700: '#3e3c48',
		bnw650: '#4c4a59',
		bnw600: '#5a586a',
		bnw550: '#68667a',
		bnw500: '#76748b',
		bnw450: '#878599',
		bnw400: '#9795a7',
		bnw350: '#a8a6b5',
		bnw300: '#b8b7c3',
		bnw250: '#c8c7d1',
		bnw200: '#d9d8df',
		bnw150: '#e6e6ea',
		bnw100: '#f1f1f3',
		bnw50: '#faf9fa',
		bnw0: '#fff'
	},
	info: {
		info1000: '#000',
		info900: '#4b3815',
		info800: '#5e471a',
		info700: '#765b21',
		info600: '#8d6d27',
		info500: '#aa8630',
		info400: '#c79f38',
		info300: '#e2b640',
		info200: '#fecf48',
		info100: '#feedB9',
		info50: '#fffaeb',
		info0: '#fff'
	},
	danger: {
		danger1000: '#000',
		danger900: '#612b23',
		danger800: '#7b362d',
		danger700: '#9b4438',
		danger600: '#ba5143',
		danger500: '#e26352',
		danger400: '#fe7e6d',
		danger300: '#fea599',
		danger200: '#ffc7c0',
		danger100: '#ffe9e6',
		danger50: '#fff8f8',
		danger0: '#fff'
	},
	green: {
		green1000: '#000',
		green900: '#1c431d',
		green800: '#235525',
		green700: '#2c6c2f',
		green600: '#358138',
		green500: '#409d44',
		green400: '#4cba51',
		green300: '#5dd462',
		green200: '#9ee5a1',
		green100: '#d9f5da',
		green50: '#f4fcf4',
		green0: '#fff'
	},
	blue: {
		blue1000: '#000',
		blue900: '#003f5e',
		blue800: '#005077',
		blue700: '#006496',
		blue600: '#0078b4',
		blue500: '#1993d0',
		blue400: '#51aedc',
		blue300: '#82c5e6',
		blue200: '#b1dbef',
		blue100: '#dff0f9',
		blue50: '#f6fbfd',
		blue0: '#fff'
	},
	orange: {
		orange1000: '#000',
		orange900: '#543416',
		orange800: '#6a421c',
		orange700: '#855323',
		orange600: '#a0642a',
		orange500: '#c37a33',
		orange400: '#e7903d',
		orange300: '#ffa956',
		orange200: '#ffca98',
		orange100: '#ffead6',
		orange50: '#fff9f3',
		orange0: '#fff'
	},
	gray: {
		gray1000: '#000',
		gray900: '#3b3b3b',
		gray800: '#4b4b4b',
		gray700: '#5f5f5f',
		gray600: '#727272',
		gray500: '#8b8b8b',
		gray400: '#a4a4a4',
		gray300: '#bcbcbc',
		gray200: '#d4d4d4',
		gray100: '#ededed',
		gray50: '#fafafa',
		gray0: '#fff'
	}
}

function customPropObjectToCss([key, value]: [key: string, value: string]) {
	return `--${key}: ${value};`
}

// @ts-ignore
export const customProps = css`
	:root {
		${Object.keys(customPropsObject).map((subPaletteName) => {
			type CustomPropsObjectKeys = keyof typeof customPropsObject
			const _subPaletteName = subPaletteName as CustomPropsObjectKeys
			return Object.entries(customPropsObject[_subPaletteName] as unknown as [string, string]).map(
				customPropObjectToCss
			)
		})}
	}
`

function customPropsToApi(props: Record<string, string>) {
	const apiKeys = Object.keys(props).map((key) => [key, `--${key}`])
	const subPaletteName = Object.keys(props)[0].replace(/\d+$/, '')
	apiKeys.push([subPaletteName, `--${subPaletteName}500`])
	apiKeys.push([`${subPaletteName}Disabled`, `--${subPaletteName}800`])
	apiKeys.push([`${subPaletteName}Hover`, `--${subPaletteName}400`])
	apiKeys.push([`${subPaletteName}Pressed`, `--${subPaletteName}300`])
	return Object.fromEntries(apiKeys)
}

const primaryApi = customPropsToApi(customPropsObject.primary)
const bnwApi = customPropsToApi(customPropsObject.bnw)
const noticeApi = customPropsToApi(customPropsObject.notice)
const successApi = customPropsToApi(customPropsObject.success)
const infoApi = customPropsToApi(customPropsObject.info)
const dangerApi = customPropsToApi(customPropsObject.danger)
const greenApi = customPropsToApi(customPropsObject.green)
const blueApi = customPropsToApi(customPropsObject.blue)
const orangeApi = customPropsToApi(customPropsObject.orange)
const grayApi = customPropsToApi(customPropsObject.gray)

// because of customPropsToApi function (which was created to automate custom
// properties creation) ts cannot output types. in the result we don't have
// autocomplete in the theme usage. to fix it we have to describe types like so.
type PrimaryKeys =
	| keyof typeof customPropsObject.primary
	| 'primary'
	| 'primaryDisabled'
	| 'primaryHover'
	| 'primaryPressed'
type BnwKeys =
	| keyof typeof customPropsObject.bnw
	| 'bnw'
	| 'bnwDisabled'
	| 'bnwHover'
	| 'bnwPressed'
type NoticeKeys =
	| keyof typeof customPropsObject.notice
	| 'notice'
	| 'noticeDisabled'
	| 'noticeHover'
	| 'noticePressed'
type SuccessKeys =
	| keyof typeof customPropsObject.success
	| 'success'
	| 'successDisabled'
	| 'successHover'
	| 'successPressed'
type InfoKeys =
	| keyof typeof customPropsObject.info
	| 'info'
	| 'infoDisabled'
	| 'infoHover'
	| 'infoPressed'
type DangerKeys =
	| keyof typeof customPropsObject.danger
	| 'danger'
	| 'dangerDisabled'
	| 'dangerHover'
	| 'dangerPressed'
type GreenKeys =
	| keyof typeof customPropsObject.green
	| 'success'
	| 'successDisabled'
	| 'successHover'
	| 'successPressed'
type BlueKeys =
	| keyof typeof customPropsObject.blue
	| 'blue'
	| 'blueDisabled'
	| 'blueHover'
	| 'bluePressed'
type OrangeKeys =
	| keyof typeof customPropsObject.orange
	| 'orange'
	| 'orangeDisabled'
	| 'orangeHover'
	| 'orangePressed'
type GrayKeys =
	| keyof typeof customPropsObject.gray
	| 'gray'
	| 'grayDisabled'
	| 'grayHover'
	| 'grayPressed'
type AllKeys =
	| PrimaryKeys
	| BnwKeys
	| NoticeKeys
	| SuccessKeys
	| InfoKeys
	| DangerKeys
	| GreenKeys
	| BlueKeys
	| OrangeKeys
	| GrayKeys
const palette: Record<AllKeys, string> = {
	...primaryApi,
	...bnwApi,
	...noticeApi,
	...successApi,
	...infoApi,
	...dangerApi,
	...greenApi,
	...blueApi,
	...orangeApi,
	...grayApi
}
type SpacingParams =
	| []
	| [number]
	| [number, number]
	| [number, number, number]
	| [number, number, number, number]

const getPx = (space = 1) => `${space * 6}px`
export const theme = {
	palette,
	shadows: [
		'none',
		`0 3px 9px var(${palette.bnw900})`,
		`0 3px 9px var(${palette.bnw950})`,
		`0 6px 9px var(${palette.bnw900})`
	],
	spacing: (...spaces: SpacingParams) => {
		const [top, right, bottom, left] = spaces
		switch (spaces.length) {
			case 0:
				return getPx()
			case 1:
				return getPx(top)
			case 2:
				return `${getPx(top)} ${getPx(right)}`
			case 3:
				return `${getPx(top)} ${getPx(right)} ${getPx(bottom)}`
			default:
				return `${getPx(top)} ${getPx(right)} ${getPx(bottom)} ${getPx(left)}`
		}
	}
}
