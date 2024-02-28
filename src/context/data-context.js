/*
  this context provider is responsible for application data.
  it fetches, massages, assembles, and--of course--provides data,
  namely to the map.

  we do import map layer components here from '@components/map',
  which feels like a circular dependency, but it's only to ensure
  our layer ids in the object housing the data align with the layer ids.
*/
import { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { useAppContext } from '@context'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {
  persistQueryClient,
  persistQueryClientSave,
} from '@tanstack/react-query-persist-client'

import { compress, decompress } from 'lz-string'

import {
  HospitalsLayer,
  PublicSchoolsLayer,
  NonPublicSchoolsLayer,
  SuperfundSitesLayer,
} from '@components/map'

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

const apiRoot = `https://enviroscan-drf.renci.org/drf/api/`

// pagination isn't available, so use this `create` wrapper,
// which handles spreading the data-fetching
// across multiple requests and gluing it together.
const createQuerier = endpoint => async () => {
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

export const DataWrangler = ({ children }) => {
  const superfundSitesQuery = useQuery({
    queryKey: ['nc_superfund_sites'],
    queryFn: createQuerier('nc_superfund_sites'),
  })
  const hospitalsQuery = useQuery({
    queryKey: ['hospitals_4326'],
    queryFn: createQuerier('hospitals_4326'),
  })
  const publicSchoolsQuery = useQuery({
    queryKey: ['public_schools_4326'],
    queryFn: createQuerier('public_schools_4326'),
  })
  const nonPublicSchoolsQuery = useQuery({
    queryKey: ['non_public_schools_4326'],
    queryFn: createQuerier('non_public_schools_4326'),
  })

  const layerData = {
    [SuperfundSitesLayer.id]: superfundSitesQuery,
    [HospitalsLayer.id]: hospitalsQuery,
    [PublicSchoolsLayer.id]: publicSchoolsQuery,
    [NonPublicSchoolsLayer.id]: nonPublicSchoolsQuery,
  }

  return (
    <DataContext.Provider value={{
      layerData,
    }}>
      { children }
    </DataContext.Provider>
  )
}

DataWrangler.propTypes = {
  children: PropTypes.node,
}

//
// we want tanstack's queryClient available within our data context, but we
// don't want layers upon layers of contexts wrapping our <App /> in index.js.
// thus we export this wrapper that provides said functionality to our
// actual machinery in `DataWrangler`, and we set up tanstack-query here.

// two queryClient options are defined here: one that caches, and one that doesn't.
// not caching is simple:
const nonCachingQueryClient = new QueryClient({ })

// caching takes a bit more setup:
const persister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: data => compress(JSON.stringify(data)),
  deserialize: data => JSON.parse(decompress(data)),
})
const cachingQueryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
})
persistQueryClient({
  persister: persister,
  queryClient: cachingQueryClient,
  maxAge: Infinity,
})

export const DataProvider = ({ children }) => {
  const { preferences } = useAppContext()

  const queryClient = preferences.cache.enabled ? cachingQueryClient : nonCachingQueryClient

  useEffect(() => {
    if (preferences.cache.enabled) {
      persistQueryClientSave({ queryClient, persister, dehydrateOptions: undefined })
      // or persistQueryClientSubscribe ?
      return
    }
    window.localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE')
  }, [queryClient])

  return (
    <QueryClientProvider client={ queryClient }>
      <DataWrangler>
        { children }
      </DataWrangler>
    </QueryClientProvider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
