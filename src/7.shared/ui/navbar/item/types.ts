export interface INavbarItemProps {
	className?: string
	classNameLink: ({ isActive }: { isActive: boolean }) => string
	content: any
	to?: string
}
