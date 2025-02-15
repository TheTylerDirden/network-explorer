import React from 'react'
import { Effector } from '@fluencelabs/deal-aurora/dist/dealExplorerClient/types/schemes'

import {
  Cell,
  Row,
  RowBlock,
  RowHeader,
  RowTrigger,
  TableBody,
  TableColumnTitle,
  TableHeader,
} from '../../components/Table'
import { ShrinkText, Text } from '../../components/Text'

const template = ['30px', 'minmax(10px, 300px)', 'minmax(10px, 100px)']

interface RequiredEffectorsTableProps {
  effectors: Effector[]
}

export const RequiredEffectorsTable: React.FC<RequiredEffectorsTableProps> = ({
  effectors,
}) => {
  return (
    <>
      <TableHeader template={template}>
        <TableColumnTitle>#</TableColumnTitle>
        <TableColumnTitle>CID</TableColumnTitle>
        <TableColumnTitle>Description</TableColumnTitle>
      </TableHeader>
      <TableBody>
        {effectors.map((effector, index) => (
          <EffectorRow index={index} key={effector.cid} effector={effector} />
        ))}
      </TableBody>
    </>
  )
}

interface EffectorRowProps {
  index: number
  effector: Effector
}

const EffectorRow: React.FC<EffectorRowProps> = ({ index, effector }) => {
  return (
    <RowBlock>
      <RowHeader>
        <RowTrigger>
          <Row template={template}>
            {/* # */}
            <Cell>
              <Text size={12}>{index + 1}</Text>
            </Cell>
            {/* CID */}
            <Cell>
              <ShrinkText size={12} color="blue">
                {effector.cid}
              </ShrinkText>
            </Cell>
            {/* Description */}
            <Cell>
              <Text size={12}>{effector.description}</Text>
            </Cell>
          </Row>
        </RowTrigger>
      </RowHeader>
    </RowBlock>
  )
}
