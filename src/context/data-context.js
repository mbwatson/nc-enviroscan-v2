import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import testData from '@content/test-data-v0.json'
import { useQuery } from '@tanstack/react-query'

const USE_TEST_DATA = process.env.USE_TEST_DATA === 'true'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

const fetchSuperfundSites = () =>
  Promise.all([
    axios('https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=1'),
    axios('https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=2'),
    axios('https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=3'),
    axios('https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=4'),
    axios('https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/?page=5'),
  ])
    .then(responses => responses.map(r => r.data.results))
    .then(data => data.reduce((geojson, d) => {
      geojson.features = geojson.features.concat(d.features)
      return geojson
    }, { type: 'FeatureCollection', features: [] }))
    .then(console.log)
    .catch(console.error)
    .finally(() => [])

export const DataProvider = ({ children }) => {
  const [sampleData, ] = useState(testData)
  const { isPending, error, data: esData } = useQuery({
    queryKey: ['nc_superfund_sites'],
    queryFn: fetchSuperfundSites,
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
