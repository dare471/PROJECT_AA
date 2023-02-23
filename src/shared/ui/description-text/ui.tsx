import { Flex, type FlexProps, Text, type TextProps } from '@chakra-ui/react'

interface DescriptionTextProps extends FlexProps {
	children?: React.ReactNode
	title: string
	titleProps?: TextProps
	textProps?: TextProps
}

export function DescriptionText(props: DescriptionTextProps) {
	const { title, titleProps, textProps, flexWrap = 'wrap', align = 'center', gap = '1', children } = props
	const { fontSize: titleFontSize = 'md', fontWeight: titleFontWeight = 'bold', ...otherTitleProps } = titleProps ?? {}
	const { fontSize: textFontSize = 'sm', ...otherTextProps } = textProps ?? {}

	return (
		<Flex flexWrap={flexWrap} align={align} gap={gap} {...props}>
			<Text fontSize={titleFontSize} fontWeight={titleFontWeight} {...otherTitleProps}>
				{title}
			</Text>
			<Text fontSize={textFontSize} {...otherTextProps}>
				{children}
			</Text>
		</Flex>
	)
}
