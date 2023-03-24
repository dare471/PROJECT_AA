import React from 'react'

export function usePagination<T>(options: { data: T[]; perPage: number; maxPages: number }) {
	const [currentPage, setCurrentPage] = React.useState(1)
	const maxPage = Math.ceil(options.data.length / options.perPage)

	const startPage = currentPage <= Math.floor(options.maxPages / 2) ? 1 : currentPage - Math.floor(options.maxPages / 2)
	const endPage =
		startPage + options.maxPages - 1 > options.data.length / options.perPage
			? Math.ceil(options.data.length / options.perPage)
			: startPage + options.maxPages - 1
	const pages: number[] = []

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i)
	}

	const indexOfLastPage = currentPage * options.perPage
	const indexOfFirstPage = indexOfLastPage - options.perPage
	const currentData = options.data.slice(indexOfFirstPage, indexOfLastPage)

	return { currentPage, setCurrentPage, currentData, maxPage, pages }
}
