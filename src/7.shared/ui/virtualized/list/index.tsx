import { FC } from 'react'
import { List as _List, ListProps } from 'react-virtualized'

export const VirtualList = _List as unknown as FC<ListProps>
