import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from '@hooks'
import ncCityData from '@data/nc-cities.json'
import {
  CensusTractsLayer,
  CountiesLayer,
  HospitalsLayer,
  PublicSchoolsLayer,
  NonPublicSchoolsLayer,
  SuperfundSitesLayer,
} from '@components/map'

const MapContext = createContext({ })
export const useMap = () => useContext(MapContext)

const RALEIGH_NC = { label: 'Raleigh, NC', longitude: -78.644257, latitude: 35.787743, zoom: 12 }

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null)
  const [viewState, setViewState] = useLocalStorage('view-state', RALEIGH_NC)
  const [mapStyle, setMapStyle] = useLocalStorage('map-style', 'min')

  const layers = {
    [HospitalsLayer.id]: { ...HospitalsLayer },
    [NonPublicSchoolsLayer.id]: { ...NonPublicSchoolsLayer },
    [PublicSchoolsLayer.id]: { ...PublicSchoolsLayer },
    [SuperfundSitesLayer.id]: { ...SuperfundSitesLayer },
  }
  const [activeLayerIds, setActiveLayerIds] = useState(new Set(['public-schools', 'hospitals']))
  const showLayer = layerId => {
    const newIds = new Set([...activeLayerIds])
    newIds.add(layerId)
    setActiveLayerIds(newIds)
  }
  const hideLayer = layerId => {
    const newIds = new Set([...activeLayerIds])
    newIds.delete(layerId)
    setActiveLayerIds(newIds)
  }
  const toggleLayer = layerId => {
    if (activeLayerIds.has(layerId)) {
      hideLayer(layerId)
      return
    }
    showLayer(layerId)
  }

  //
  const boundaryLayers = {
    [CensusTractsLayer.id]: { ...CensusTractsLayer },
    [CountiesLayer.id]: { ...CountiesLayer },
  }
  const [activeBoundaryLayerId, setActiveBoundaryLayerId] = useState('counties')

  //
  const [popupInfo, setPopupInfo] = useState(null)
  const closePopup = () => {
    setPopupInfo(null)
  }

  //
  const locationPresets = Object.keys(ncCityData.cities)
    .map(cityName => ({
      label: `${ cityName }, NC`,
      latitude: ncCityData.cities[cityName].lat,
      longitude: ncCityData.cities[cityName].long,
    }))
    .sort((c, d) => c.label < d.label ? -1 : 1)

  const getBaseMap = useCallback(colorMode => {
    const options = {
      'min': colorMode === 'dark' ? 'dark-v11' : 'light-v11',
      'nav': colorMode === 'dark' ? 'navigation-night-v1' : 'navigation-day-v1',
      'outdoors': 'outdoors-v9',
      'sat': 'satellite-v9',
    }
    return options[mapStyle]
  }, [mapStyle])

  //
  const flyTo = useCallback(({ latitude, longitude }) => {
    if (!mapRef.current) {
      return
    }
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 12,
      duration: 2000,
    })
  }, [mapRef.current])

  // think: "hovered" or "highlighted" in practice
  const [engagedFeature, setEngagedFeature] = useState(null)
  useEffect(() => {
    setEngagedFeature(null)
  }, [activeBoundaryLayerId])

  // think: "selected"
  const [activeRegion, setActiveRegion] = useState(null)

  return (
    <MapContext.Provider value={{
      mapRef,
      viewState: {
        current: viewState,
        set: setViewState,
      },
      mapStyle: {
        current: mapStyle,
        set: setMapStyle,
        getBaseMap,
      },
      locationPresets,
      flyTo,
      popup: {
        info: popupInfo,
        set: setPopupInfo,
        close: closePopup,
      },
      layers: {
        available: { ...layers },
        active: [...activeLayerIds],
        toggle: toggleLayer,
        show: showLayer,
        hide: hideLayer,
      },
      boundary: {
        available: boundaryLayers,
        current: activeBoundaryLayerId,
        set: setActiveBoundaryLayerId,
      },
      engagedFeature: {
        current: engagedFeature,
        set: setEngagedFeature,
      },
      activeRegion: {
        current: activeRegion,
        set: setActiveRegion,
      },
    }}>
      { children }
    </MapContext.Provider>
  )
}

MapProvider.propTypes = {
  children: PropTypes.node,
}
