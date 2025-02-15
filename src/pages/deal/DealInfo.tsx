import React from 'react'
import styled from '@emotion/styled'
import { useParams } from 'wouter'

import { A } from '../../components/A'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { Copyable } from '../../components/Copyable'
import { DealStatus } from '../../components/DealStatus'
import { Space } from '../../components/Space'
import { Text } from '../../components/Text'
import { TokenBadge } from '../../components/TokenBadge'
import { Tooltip } from '../../components/Tooltip'
import { useApiQuery } from '../../hooks'

import { colors } from '../../constants/colors'

import { MatchingTable } from './MatchingTable'
import { RequiredEffectorsTable } from './RequiredEffectorsTable'

export const DealInfo: React.FC = () => {
  const params = useParams()

  const { id } = params

  const { data: deal } = useApiQuery((client) => client.getDeal(id))

  if (!deal) {
    return
  }

  const renderProviderList = (list: string[]) => {
    if (!list.length)
      return (
        <EmptyParameterValue>
          <Text size={12} color="grey500">
            No information
          </Text>
        </EmptyParameterValue>
      )

    return list.map((address) => (
      <Text size={12} key={address}>
        {address}
      </Text>
    ))
  }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: 'Deals',
            path: '/deals',
          },
          {
            label: id,
          },
        ]}
      />
      <Content>
        <Left>
          <Text size={32}>Deal info</Text>
        </Left>
        <Right>
          <Space height="33px" />
          <InfoRow>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Deal ID
              </Text>
              <TextWithIcon>
                <A href={'#'}>{id}</A>
                <Copyable value={id} />
              </TextWithIcon>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Status
              </Text>
              <DealStatus status={deal.status} />
            </Info>
          </InfoRow>
          <Space height="32px" />
          <InfoRow>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Client
              </Text>
              <TextWithIcon>
                <A href={'#'}>{id}</A>
                <Copyable value={id} />
              </TextWithIcon>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Balance
              </Text>
              <TextWithBadge>
                <Text size={12}>{deal.balance}</Text>
                <TokenBadge bg="grey200">
                  <Text size={10} weight={800} color="grey500">
                    {deal.paymentToken.symbol}
                  </Text>
                </TokenBadge>
              </TextWithBadge>
            </Info>
          </InfoRow>
          <Space height="32px" />
          <InfoRow>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                App CID
              </Text>
              <TextWithIcon>
                <A href={'#'}>{id}</A>
                <Copyable value={id} />
              </TextWithIcon>
            </Info>
            <Info>
              <Text size={10} weight={700} uppercase color="grey400">
                Earnings
              </Text>
              <TextWithBadge>
                <Text size={12}>{deal.totalEarnings}</Text>
                <TokenBadge bg="grey200">
                  <Text size={10} weight={800} color="grey500">
                    {deal.paymentToken.symbol}
                  </Text>
                </TokenBadge>
              </TextWithBadge>
            </Info>
          </InfoRow>
          <Space height="56px" />
          <Text size={20}>Matching parameters</Text>
          <Space height="30px" />
          <ParametersRow>
            <Parameter>
              <Row>
                <Text size={10} weight={700} uppercase color="grey400">
                  Min Workers
                </Text>
                <Tooltip>
                  <Text>Example</Text>
                </Tooltip>
              </Row>
              <ParameterValue>
                <Text size={20}>{deal.minWorkers}</Text>
              </ParameterValue>
            </Parameter>
            <Parameter>
              <Row>
                <Text size={10} weight={700} uppercase color="grey400">
                  Target Workers
                </Text>
                <Tooltip>
                  <Text>Example</Text>
                </Tooltip>
              </Row>
              <ParameterValue>
                <Text size={20}>{deal.targetWorkers}</Text>
              </ParameterValue>
            </Parameter>
            <Parameter>
              <Row>
                <Text size={10} weight={700} uppercase color="grey400">
                  Max Workers Per Provider
                </Text>
                <Tooltip>
                  <Text>Example</Text>
                </Tooltip>
              </Row>
              <ParameterValue>
                <Text size={20}>{deal.maxWorkersPerProvider}</Text>
              </ParameterValue>
            </Parameter>
          </ParametersRow>
          <Space height="48px" />
          <ParametersRow>
            <Parameter>
              <Text size={10} weight={700} uppercase color="grey400">
                Payment Token
              </Text>
              <ParameterValue>
                <Text size={20}>{deal.paymentToken.symbol}</Text>
              </ParameterValue>
            </Parameter>
            <Parameter>
              <Text size={10} weight={700} uppercase color="grey400">
                Price Per Worker Epoch
              </Text>
              <ParameterValue>
                <Text size={20}>{deal.pricePerWorkerEpoch}</Text>
                <TokenBadge bg="grey200">
                  <Text size={10} weight={800} color="grey500">
                    {deal.paymentToken.symbol}
                  </Text>
                </TokenBadge>
              </ParameterValue>
            </Parameter>
          </ParametersRow>
          <Space height="40px" />
          <ParametersRowSingle>
            <ParameterSmall>
              <Text size={10} weight={700} uppercase color="grey400">
                Providers Whitelist Bloom
              </Text>
              {renderProviderList(deal.whitelist)}
            </ParameterSmall>
          </ParametersRowSingle>
          <Space height="32px" />
          <ParametersRowSingle>
            <ParameterSmall>
              <Text size={10} weight={700} uppercase color="grey400">
                Providers Blacklist Bloom
              </Text>
              {renderProviderList(deal.blacklist)}
            </ParameterSmall>
          </ParametersRowSingle>
          <Space height="60px" />
          <Text size={20}>Required effectors</Text>
          <Space height="24px" />
          <RequiredEffectorsTableWrapper>
            <RequiredEffectorsTable effectors={deal.effectors} />
          </RequiredEffectorsTableWrapper>
          <Space height="59px" />
          <Text size={20}>Matching result</Text>
          <Space height="30px" />
          <ParametersRow>
            <Parameter>
              <Row>
                <Text size={10} weight={700} uppercase color="grey400">
                  Min, Matched / Target
                </Text>
                <Tooltip>
                  <Text>Example</Text>
                </Tooltip>
              </Row>
              <ParameterValue>
                <Text size={20}>
                  {deal.minWorkers}, {deal.matchedWorkers}/{deal.targetWorkers}
                </Text>
              </ParameterValue>
            </Parameter>
            <Parameter>
              <Row>
                <Text size={10} weight={700} uppercase color="grey400">
                  Registered / Matched
                </Text>
                <Tooltip>
                  <Text>Example</Text>
                </Tooltip>
              </Row>
              <ParameterValue>
                <Text size={20}>
                  {deal.registeredWorkers}/{deal.matchedWorkers}
                </Text>
              </ParameterValue>
            </Parameter>
          </ParametersRow>
          <Space height="40px" />
          <MatchingTable />
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
  grid-template-columns: 400px 300px;
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
  grid-template-columns: 200px 200px 200px;
`

const ParametersRowSingle = styled(ParametersRow)`
  grid-template-columns: 66%;
`

const Parameter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const ParameterSmall = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ParameterValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const EmptyParameterValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background: ${colors.grey100};
  border-radius: 8px;
`

const RequiredEffectorsTableWrapper = styled.div`
  width: 50%;
`

const TextWithBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
