import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import testData from '@content/test-data-v0.json'
import { useQuery } from '@tanstack/react-query'

const USE_TEST_DATA = true

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [sampleData, ] = useState(testData)
  const { /*isPending, error,*/ data: esData } = useQuery({
    queryKey: ['nc_superfund_sites'],
    queryFn: () =>
      Promise.all([
        fetch('http://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=1'),
        fetch('http://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=2'),
        fetch('http://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=3'),
        fetch('http://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=4'),
        fetch('http://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=5'),
      ])
        .then(responses => {
          const combined = [...responses.map(res => res.data)]
          console.log(combined)
          return combined
        })
        .catch(console.error)
        .finally(() => []),
  })

  console.log(esData)

  return (
    <DataContext.Provider value={{
      data: USE_TEST_DATA ? sampleData : esData,
    }}>
      { children }
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
