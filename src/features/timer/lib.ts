export function fromTimestampToTimer(timestamp: number): string {
	const date = new Date(Date.now())
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)

	date.setSeconds(timestamp)

	const hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
	const minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
	const seconds = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds()

	return `${hours}:${minutes}:${seconds}`
}
