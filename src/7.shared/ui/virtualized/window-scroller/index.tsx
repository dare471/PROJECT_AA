import { FC } from 'react'
import { WindowScroller as _WindowScroller, WindowScrollerProps } from 'react-virtualized'

export const VirtualWindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>
