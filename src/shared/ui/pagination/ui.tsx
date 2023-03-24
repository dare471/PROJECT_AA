import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup } from '@chakra-ui/react'

export function Pagination(props: {
	pages: number[]
	currentPage: number
	onFirstClick: () => void
	onLastClick: () => void
	onPageChange: (page: number) => void
}) {
	const { pages, currentPage, onFirstClick, onLastClick, onPageChange } = props
	console.log(currentPage === pages[pages.length - 1])

	return (
		<ButtonGroup colorScheme='blue' variant='outline'>
			<Button onClick={onFirstClick}>
				<ArrowLeftIcon />
			</Button>
			<Button isDisabled={currentPage === pages[0]} onClick={() => onPageChange(currentPage - 1)}>
				<ChevronLeftIcon />
			</Button>
			{pages.map((page, index) => (
				<Button key={index} isActive={page === currentPage} onClick={() => onPageChange(page)}>
					{page}
				</Button>
			))}
			<Button isDisabled={currentPage === pages[pages.length - 1]} onClick={() => onPageChange(currentPage + 1)}>
				<ChevronRightIcon />
			</Button>
			<Button onClick={onLastClick}>
				<ArrowRightIcon />
			</Button>
		</ButtonGroup>
	)
}
