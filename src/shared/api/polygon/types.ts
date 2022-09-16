export interface IPolygon {
	[key: string]: any
}

export type TPolygons = IPolygon[] | null

//Better approach for store all Polygons etc
export interface IAll {
	id: string
	type: 'country' | 'area' | 'district' | 'polygon'
	name: string
	geometry: {
		figure: string
		coordinates: number[][]
	}
	children: IAll[] | null
}

// export type TAlls = IAll[] | null

// const all: TAlls = [
// 	{
// 		id: 'feffq',
// 		type: 'country',
// 		name: 'Kazakhstan',
// 		geometry: {
// 			figure: 'ejffjw',
// 			coordinates: [
// 				[12, 45],
// 				[12, 45],
// 				[12, 45],
// 				[12, 45]
// 			]
// 		},
// 		children: null
// 	}
// ]

// all.map(item => (
// 	<>
// 		<p>{item.name}</p>
// 		<ul>
// 			{item.children?.map(childItem => (
// 				<></>
// 			))}
// 		</ul>
// 	</>
// ))
