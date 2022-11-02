import { FC } from 'react'
import { CellMeasurer as _CellMeasurer, CellMeasurerProps } from 'react-virtualized'

export const VirtualCellMeasurer = _CellMeasurer as unknown as FC<CellMeasurerProps>
