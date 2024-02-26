import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

const apiRoot = `https://enviroscan-drf.renci.org/drf/api/`

const fetchFeatures = async endpoint => {
  const getCount = async () => {
    const { data } = await axios.get(`${ apiRoot }${ endpoint }?page=1`)
    if (!data) {
      return 0
    }
    return data.count
  }

  // first, let's see how many pages there are.
  const count = await getCount()
  // bail out and send back empty features array if none.
  if (['NaN', 0].includes(Number(count))) {
    return { type: 'FeatureCollection', features: [] }
  }
  // we have a non-zero number of pages,
  // so we make the neccssary number of requests.
  const promises = [...Array(Math.ceil(count / 10)).keys()]
    .map(p => axios(`${ apiRoot }${ endpoint }?page=${ p + 1 }`))
  // return all features stitched together.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data.results))
    .then(data => data.reduce((geojson, d) => {
        geojson.features = geojson.features.concat(d.features)
        return geojson
      }, { type: 'FeatureCollection', features: [] }))
    .catch(console.error)
}

export const DataProvider = ({ children }) => {
  const superfundSitesQuery = useQuery({
    queryKey: ['superfund-sites'],
    queryFn: () => fetchFeatures('nc_superfund_sites'),
  })
  const hospitalsQuery = useQuery({
    queryKey: ['hospitals'],
    queryFn: () => fetchFeatures('hospitals_4326'),
  })
  const publicSchoolsQuery = useQuery({
    queryKey: ['public-schools'],
    queryFn: () => fetchFeatures('public_schools_4326'),
  })
  const nonPublicSchoolsQuery = useQuery({
    queryKey: ['non-public-schools'],
    queryFn: () => fetchFeatures('non_public_schools_4326'),
  })

  const layerData = {
    'superfund-sites': {
      id: 'superfund-sites',
      name: 'NC Superfund Sites',
      query: superfundSitesQuery,
    },
    'hospitals': {
      id: 'hospitals',
      name: 'Hospitals',
      query: hospitalsQuery,
    },
    'public-schools': {
      id: 'public-schools',
      name: 'Public Schools',
      query: publicSchoolsQuery,
    },
    'non-public-schools': {
      id: 'non-public-schools',
      name: 'Non-public Schools',
      query: nonPublicSchoolsQuery,
    },
  }

  return (
    <DataContext.Provider value={{
      layerData,
      superfundSites: superfundSitesQuery.data,
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
