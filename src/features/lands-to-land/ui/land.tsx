import { useUnit } from "effector-react";
import type { createLandsToLand, Land } from "../model";

interface LandProps<T extends Land> {
	model: ReturnType<typeof createLandsToLand<T>>
	children: (args: { land: T }) => React.ReactNode
}


export function Land<T extends Land>(props: LandProps<T>) {
	const { model, children } = props
	const [land] = useUnit([model.$land])

	if(!land) return null

	return (
		<>{children({ land })}</>
	)
}
