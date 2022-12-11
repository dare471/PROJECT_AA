type SpacingParams =
	| []
	| [number]
	| [number, number]
	| [number, number, number]
	| [number, number, number, number]

const getPx = (space = 1) => `${space * 6}px`

export function spacing(...spaces: SpacingParams) {
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
		case 4:
			return `${getPx(top)} ${getPx(right)} ${getPx(bottom)} ${getPx(right)}`
	}
}
