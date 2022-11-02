import { HTMLProps } from 'react'

import { Logo } from '@/7.shared/assets'

import './styles.scss'

type TProjectLogoProps = {
	classNameImage?: string
} & HTMLProps<HTMLDivElement>

export const ProjectLogo = ({ className, classNameImage, alt = 'Project logo', ...props }: TProjectLogoProps) => (
	<div className={`logo_wrapper${className ? ' ' + className : ''}`} {...props}>
		<img className={`logo_image${classNameImage ? ' ' + classNameImage : ''}`} src={Logo} alt={alt} />
	</div>
)
