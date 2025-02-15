import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'wouter'

import { A } from '../../components/A'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { ButtonGroup } from '../../components/ButtonGroup'
import { CapacityStatus } from '../../components/CapacityStatus'
import { Copyable } from '../../components/Copyable'
import { Space } from '../../components/Space'
import { Text } from '../../components/Text'
import { TokenBadge } from '../../components/TokenBadge'
import { useApiQuery } from '../../hooks'
import { formatUnixTimestamp } from '../../utils/formatUnixTimestamp'

import { ListComputeUnitsTable } from './ListComputeUnitsTable'
import { ProofsTable } from './ProofsTable'

const items = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export const CapacityInfo: React.FC = () => {
  const params = useParams()
  const [value, setValue] = useState(items[0].value)

  const { id } = params

  const { data: capacity } = useApiQuery((client) =>
    client.getCapacityCommitment(id),
  )

  if (!capacity) {
    return null
  }

  const createdAt = formatUnixTimestamp(capacity.createdAt)
  const expiredAt = capacity.expiredAt
    ? formatUnixTimestamp(capacity.expiredAt)
    : { date: '-', time: '' }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: 'Capacity',
            path: '/capacities',
          },
          {
            label: id,
          },
        ]}
      />
      <Content>
        <Left>
          <Text size={32}>Capacity commitment</Text>
        </Left>
        <Right>
          <Space height="33px" />
          <InfoRow>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Capacity commitment
              </Text>
              <TextWithIcon>
                <A href={`/capacity/${id}`}>{id}</A>
                <Copyable value={id} />
              </TextWithIcon>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Compute units
              </Text>
              <Text size={12}>{capacity.computeUnitsCount}</Text>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Created at
              </Text>
              <Text size={12}>
                {createdAt.date} {createdAt.time}
              </Text>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Provider id
              </Text>
              <A href={`/provider/${capacity.providerId}`}>
                {capacity.providerId}
              </A>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Total collateral
              </Text>
              <Row>
                <Text size={12}>{capacity.totalCollateral}</Text>
                <TokenBadge bg="black900">
                  <Text size={10} weight={800} color="white">
                    {capacity.collateralToken.symbol}
                  </Text>
                </TokenBadge>
              </Row>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Expiration
              </Text>
              <Text size={12}>
                {expiredAt.date} {expiredAt.time}
              </Text>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Peer id
              </Text>
              <TextWithIcon>
                <A href={`/peer/${capacity.peerId}`}>{capacity.peerId}</A>
                <Copyable value={capacity.peerId} />
              </TextWithIcon>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Reward delegator rate
              </Text>
              <Text size={12}>{capacity.rewardDelegatorRate}%</Text>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Status
              </Text>
              <CapacityStatus status={capacity.status} />
            </Info>
          </InfoRow>
          <Space height="64px" />
          <Text size={24}>Rewards</Text>
          <Space height="24px" />
          <ParametersRow>
            <Parameter>
              <Text size={10} weight={700} uppercase color="grey400">
                Total CC rewards over time
              </Text>
              <ParameterValue>
                <Text size={12}>{capacity.rewardsTotal}</Text>
                <TokenBadge bg="black900">
                  <Text size={10} weight={800} color="white">
                    {capacity.collateralToken.symbol}
                  </Text>
                </TokenBadge>
              </ParameterValue>
            </Parameter>
          </ParametersRow>
          <Space height="40px" />
          <ParametersRow>
            <div>
              <Text size={24}>Provider</Text>
              <Space height="24px" />
              <Parameter>
                <Text size={10} weight={700} uppercase color="grey400">
                  Not Withdrawn Rewards
                </Text>
                <ParameterValue>
                  <Text size={12}>{capacity.rewardsNotWithdrawnProvider}</Text>
                  <TokenBadge bg="black900">
                    <Text size={10} weight={800} color="white">
                      {capacity.collateralToken.symbol}
                    </Text>
                  </TokenBadge>
                </ParameterValue>
              </Parameter>
              <Space height="32px" />
              <Parameter>
                <Text size={10} weight={700} uppercase color="grey400">
                  Unlocked Rewards
                </Text>
                <ParameterValue>
                  <Text size={12}>{capacity.rewardsUnlockedProvider}</Text>
                  <TokenBadge bg="black900">
                    <Text size={10} weight={800} color="white">
                      {capacity.collateralToken.symbol}
                    </Text>
                  </TokenBadge>
                </ParameterValue>
              </Parameter>
            </div>
            <div>
              <Text size={24}>Delegator</Text>
              <Space height="24px" />
              <Parameter>
                <Text size={10} weight={700} uppercase color="grey400">
                  Not Withdrawn Rewards
                </Text>
                <ParameterValue>
                  <Text size={12}>{capacity.rewardsNotWithdrawnDelegator}</Text>
                  <TokenBadge bg="black900">
                    <Text size={10} weight={800} color="white">
                      {capacity.collateralToken.symbol}
                    </Text>
                  </TokenBadge>
                </ParameterValue>
              </Parameter>
              <Space height="32px" />
              <Parameter>
                <Text size={10} weight={700} uppercase color="grey400">
                  Unlocked Rewards
                </Text>
                <ParameterValue>
                  <Text size={12}>{capacity.rewardsUnlockedDelegator}</Text>
                  <TokenBadge bg="black900">
                    <Text size={10} weight={800} color="white">
                      {capacity.collateralToken.symbol}
                    </Text>
                  </TokenBadge>
                </ParameterValue>
              </Parameter>
            </div>
          </ParametersRow>
          <Space height="80px" />
          <Text size={24}>List of compute units [NOT EXIST]</Text>
          <Space height="24px" />
          <ButtonGroup value={value} onSelect={setValue} items={items} />
          <Space height="32px" />
          <ListComputeUnitsTableWrapper>
            <ListComputeUnitsTable />
          </ListComputeUnitsTableWrapper>
          <Space height="24px" />
          <Text size={24}>Proofs [NOT EXIST]</Text>
          <Space height="30px" />
          <ProofsTable />
        </Right>
      </Content>
    </>
  )
}

const Content = styled.div`
  display: flex;
  margin-top: 12px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`

const Left = styled.div`
  width: 350px;
`

const Right = styled.div`
  width: 100%;
  flex-direction: column;
`

const InfoRow = styled.div`
  display: grid;
  grid-template-columns:
    fit-content(400px) fit-content(400px)
    fit-content(400px);
  gap: 32px 100px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TextWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const ParametersRow = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  gap: 120px;
`

const Parameter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ParameterValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const ListComputeUnitsTableWrapper = styled.div`
  width: 50%;
`
