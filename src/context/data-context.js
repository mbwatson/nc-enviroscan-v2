import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import testData from '@content/test-data-v0.json'
import { useQuery } from '@tanstack/react-query'

const USE_TEST_DATA = process.env.USE_TEST_DATA === 'true'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

const getCount = async url => {
  const { data } = await axios.get(url)
  if (!data) {
    return 0
  }
  return data.count
}

const fetchFeatures = async url => {
  // first, let's see how many pages there are.
  const count = await getCount(`${ url }?page=1`)
  // bail out and send back empty features array if none.
  if (['NaN', 0].includes(Number(count))) {
    return { type: 'FeatureCollection', features: [] }
  }
  // we have a non-zero number of pages,
  // so we make the neccssary number of requests.
  const promises = [...Array(Math.ceil(count / 10)).keys()]
    .map(p => axios(`${ url }?page=${ p + 1 }`))
  // return all features stitched together.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data.results))
    .then(data => data.reduce((geojson, d) => {
        geojson.features = geojson.features.concat(d.features)
        return geojson
      }, { type: 'FeatureCollection', features: [] }))
    .catch(console.error)

}

const fetchSuperfundSites = () => fetchFeatures(`https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/`)
const fetchHospitals = () => fetchFeatures(`https://enviroscan-drf.renci.org/drf/api/nc_superfund_sites/`)
const fetchPublicSchools = () => fetchFeatures(`https://enviroscan-drf.renci.org/drf/api/public_schools_4326/`)
const fetchNonPublicSchools = () => fetchFeatures(`https://enviroscan-drf.renci.org/drf/api/non_public_schools_4326/`)

export const DataProvider = ({ children }) => {
  const [sampleData, ] = useState(testData)
  const hospitalsQuery = useQuery({ queryKey: ['hospitals'], queryFn: fetchHospitals })
  const publicSchoolsQuery = useQuery({ queryKey: ['public-schools'], queryFn: fetchPublicSchools })
  const nonPublicSchoolsQuery = useQuery({ queryKey: ['non-public-schools'], queryFn: fetchNonPublicSchools })

  return (
    <DataContext.Provider value={{
      data: sampleData,
      hospitals: hospitalsQuery.data,
      publicSchools: publicSchoolsQuery.data,
      nonPublicSchools: nonPublicSchoolsQuery.data,
    }}>
      { children }
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
