import { palette } from './palette'

export const shadow = {
	primary: [
		`0 3px 9px var(${palette.primary400})`,
		`0 3px 9px var(${palette.primary200})`,
		`0 6px 9px var(${palette.primary100})`
	],
	secondary: [
		`0 3px 9px var(${palette.secondary400})`,
		`0 3px 9px var(${palette.secondary200})`,
		`0 6px 9px var(${palette.secondary100})`
	],
	success: [
		`0 3px 9px var(${palette.success400})`,
		`0 3px 9px var(${palette.success200})`,
		`0 6px 9px var(${palette.success100})`
	],
	warning: [
		`0 3px 9px var(${palette.warning400})`,
		`0 3px 9px var(${palette.warning200})`,
		`0 6px 9px var(${palette.warning100})`
	],
	danger: [
		`0 3px 9px var(${palette.danger400})`,
		`0 3px 9px var(${palette.danger200})`,
		`0 6px 9px var(${palette.danger100})`
	],
	info: [
		`0 3px 9px var(${palette.info400})`,
		`0 3px 9px var(${palette.info200})`,
		`0 6px 9px var(${palette.info100})`
	],
	bnw: [
		`0 4px 24px 0 var(${palette.bnw400})`,
		`0 4px 24px 0 var(${palette.bnw200})`,
		`0 4px 24px 0 var(${palette.bnw100})`
	]
}
