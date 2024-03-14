import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useColorScheme } from '@mui/joy/styles'
import {
  useLocalStorage,
  useToggleLocalStorage,
  useToggleState,
  useWindowSize,
} from '@hooks'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import MinimalDark from '@images/map-styles/dark-v11.png'
import MinimalLight from '@images/map-styles/light-v11.png'
import NavigationNight from '@images/map-styles/navigation-night-v1.png'
import NavigationDay from '@images/map-styles/navigation-day-v1.png'
import Outdoors from '@images/map-styles/outdoors-v12.png'
import Satellite from '@images/map-styles/satellite-v9.png'

const AppContext = createContext({ })
export const useAppContext = () => useContext(AppContext)

// all things related to the map's styling, particularly
// as it relates to the current mode (dark/light), which can get messy.
const useMapStyle = (colorMode) => {
  const [mapStyle, setMapStyle] = useLocalStorage('map-style', 'min')
  const [boundaryColor, setBoundaryColor] = useLocalStorage('boundary-color', '#f99')

  const baseMap = useMemo(() => ({
    'min': colorMode === 'dark' ? 'dark-v11' : 'light-v11',
    'nav': colorMode === 'dark' ? 'navigation-night-v1' : 'navigation-day-v1',
    'outdoors': 'outdoors-v12',
    'sat': 'satellite-v9',
  }), [colorMode])

  const baseMapThumbnails = useMemo(() => ({
    'dark-v11': MinimalDark,
    'light-v11': MinimalLight,
    'navigation-night-v1': NavigationNight,
    'navigation-day-v1': NavigationDay,
    'outdoors-v12': Outdoors,
    'satellite-v9': Satellite,
  }), [])

  return {
    current: mapStyle,
    set: setMapStyle,
    baseMap: baseMap[mapStyle],
    baseMapThumbnail: baseMapThumbnails[baseMap[mapStyle]],
    getBaseMap: _mapStyle => baseMap[_mapStyle],
    getBaseMapThumbnail: _mapStyle => baseMapThumbnails[_mapStyle],
    boundaryColor: {
      current: boundaryColor,
      set: setBoundaryColor,
    },
  }
}

// this context essentially pulls all the other contexts
// together, responsible for collecting all the
// functionality used throughout the application and
// reconciling the related states that depend on one another.
export const AppContextProvider = ({ children }) => {
  const windowSize = useWindowSize()
  const [loading, setLoading] = useState(false)

  const preferencesDrawer = useToggleState()
  const drawer = {
    visibility: preferencesDrawer.enabled,
    show: preferencesDrawer.set,
    hide: preferencesDrawer.unset,
    toggle: preferencesDrawer.toggle,    
  }

  // here we make a generic adapter to interface
  // with MUI Joy's useColorScheme API.
  const { mode, setMode } = useColorScheme()
  const inLightMode = useMemo(() => mode === 'light', [mode])
  const inDarkMode = useMemo(() => mode === 'dark', [mode])
  const otherColorMode = useMemo(() => inDarkMode ? 'light' : 'dark', [mode])
  const toggleColorMode = useCallback(() => setMode(otherColorMode), [mode])
  const mapStyle = useMapStyle(mode)
  
  const cache = useToggleLocalStorage('use-cache')

  const shouldZoomToRegion = useToggleLocalStorage('zoom-to-bounds')

  const showCenterMarker = useToggleLocalStorage('show-center-marker')

  const notify = (message, type = 'default') => {
    toast(message, { type })
  }

  return (
    <AppContext.Provider value={{
      loading, setLoading,
      notify,
      preferences: {
        ...drawer,
        colorMode: {
          current: mode,
          other: otherColorMode,
          toggle: toggleColorMode,
          light: inLightMode,
          dark: inDarkMode,
        },
        mapStyle,
        shouldZoomToRegion,
        showCenterMarker,
        cache,
      },
      windowSize,
    }}>
      { children }
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}
