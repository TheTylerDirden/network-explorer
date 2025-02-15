import React from 'react'
import styled from '@emotion/styled'
import { OffersFilters } from '@fluencelabs/deal-aurora/dist/dealExplorerClient/types/filters'

import { Filters } from '../../components/Filters'
import { Search } from '../../components/Search'
import { Space } from '../../components/Space'
import { Switch } from '../../components/Switch'
import { Text } from '../../components/Text'
import { useFilters } from '../../hooks/useFilters'

import { OffersFilterModal } from './OffersFilterModal'
import { OffersTable } from './OffersTable'

export const Offers: React.FC = () => {
  const [filters, setFilter, resetFilters] = useFilters<OffersFilters>()

  return (
    <>
      <Header>
        <Text size={32}>List of offers</Text>
        <FiltersBlock>
          <Filters>
            <OffersFilterModal
              filters={filters}
              setFilter={setFilter}
              resetFilters={resetFilters}
            />
          </Filters>
          <Search
            value={filters.search ?? ''}
            onChange={(search) => setFilter('search', search)}
            placeholder="Search by Offer ID / Provider ID"
          />
        </FiltersBlock>
      </Header>
      <Space height="16px" />
      <Switch
        label="Offers from approved providers"
        value={filters.onlyApproved ?? false}
        onSwitch={(value) =>
          setFilter('onlyApproved', !value ? undefined : true)
        }
      />
      <Space height="64px" />
      <OffersTable filters={filters} />
    </>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const FiltersBlock = styled.div`
  display: flex;
  gap: 16px;
`
