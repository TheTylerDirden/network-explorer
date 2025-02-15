import React, { CSSProperties } from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from '@emotion/styled'
import { OrderType } from '@fluencelabs/deal-aurora/dist/dealExplorerClient/types/filters'

import { SortIcon } from '../assets/icons'
import { setProp } from '../utils/setProp'

import { colors } from '../constants/colors'

import { Text } from './Text'

interface TableBodyProps {
  isLoading?: boolean
  skeletonCount?: number
  skeletonHeight?: number
  children: React.ReactNode | React.ReactNode[]
}

export const TableBody: React.FC<TableBodyProps> = ({
  isLoading,
  skeletonCount = 5,
  skeletonHeight = 48,
  children,
}) => {
  if (isLoading) {
    return (
      <TableBodySkeleton>
        {Array.from(Array(skeletonCount)).map((_, i) => (
          <Skeleton key={i} height={skeletonHeight} />
        ))}
      </TableBodySkeleton>
    )
  }

  return <TableBodyStyled>{children}</TableBodyStyled>
}

interface TableColumnTitleWithSortProps<Field extends string> {
  order: OrderType
  field: Field
  isActive: boolean
  onSort: (field: Field, order: OrderType) => void
  children: React.ReactNode | React.ReactNode[]
}

export const TableColumnTitleWithSort = <Field extends string>({
  isActive,
  order,
  field,
  onSort,
  children,
}: TableColumnTitleWithSortProps<Field>) => {
  const handleSort = () => {
    const oppositeOrder = order === 'asc' ? 'desc' : 'asc'
    onSort(field, isActive ? oppositeOrder : 'asc')
  }

  return (
    <HeaderCellWithSort>
      <HeaderCellWithTooltip onClick={handleSort}>
        <TableColumnTitle>{children}</TableColumnTitle>
        <SortIconStyled type={isActive ? order : 'desc'} />
      </HeaderCellWithTooltip>
    </HeaderCellWithSort>
  )
}

const TableBodySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  line-height: 1;
`

const TableBodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const TableHeader = styled.div<{ template: string[] }>`
  padding: 12px;
  display: grid;
  grid-template-columns: ${({ template }) => template.join(' ')};
  gap: 24px;
  align-items: center;
`

export const HeaderCellWithTooltip = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

const HeaderCellWithSort = styled.div`
  display: flex;
  align-items: flex-start;
`

export const TableColumnTitle = styled(Text)`
  color: ${colors.grey400};
  font-size: 10px;
  font-weight: 700;
  line-height: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-wrap: nowrap;
`

export const RowBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.grey100};
  border-radius: 8px;
`

export const RowHeader = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 12px 12px;
`

export const RowTrigger = styled.div`
  width: 100%;
`

export const Row = styled.div<{ template: string[] }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ template }) => template.join(' ')};
  gap: 24px;
`

export const Cell = styled.div<{
  justifyContent?: CSSProperties['justifyContent']
  flexDirection?: CSSProperties['flexDirection']
  alignItems?: CSSProperties['alignItems']
  gap?: CSSProperties['gap']
}>`
  display: flex;
  text-wrap: nowrap;

  ${setProp('alignItems', 'align-items', 'center')};
  ${setProp('flexDirection', 'flex-direction')};
  ${setProp('justifyContent', 'justify-content')};
  ${setProp('gap', 'gap')};
`

export const SortIconStyled = styled(SortIcon)<{ type: OrderType }>`
  transform: ${({ type }) =>
    type === 'asc' ? 'rotate(-180deg)' : 'rotate(0deg)'};
  transition: transform 250ms ease-in-out;
`
