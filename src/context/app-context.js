import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useColorScheme } from '@mui/joy/styles'
import { useLocalStorage, useWindowSize } from '@hooks'
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

export const AppContextProvider = ({ children }) => {
  const windowSize = useWindowSize()
  const { mode, setMode } = useColorScheme()
  const [mapStyle, setMapStyle] = useLocalStorage('map-style', 'min')
  const [cache, setCache] = useLocalStorage('use-cache', false)
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePreferences = () => setDrawerVisibility(!drawerVisibility)
  const closePreferences = () => setDrawerVisibility(false)
  const openPreferences = () => setDrawerVisibility(true)

  const inLightMode = useMemo(() => mode === 'light', [mode])
  const inDarkMode = useMemo(() => mode === 'dark', [mode])
  const otherColorMode = useMemo(() => inDarkMode ? 'light' : 'dark', [mode])
  const toggleColorMode = useCallback(() => setMode(otherColorMode), [mode])

  const baseMap = useMemo(() => ({
    'min': mode === 'dark' ? 'dark-v11' : 'light-v11',
    'nav': mode === 'dark' ? 'navigation-night-v1' : 'navigation-day-v1',
    'outdoors': 'outdoors-v12',
    'sat': 'satellite-v9',
  }), [mode])

  const baseMapThumbnails = useMemo(() => ({
    'dark-v11': MinimalDark,
    'light-v11': MinimalLight,
    'navigation-night-v1': NavigationNight,
    'navigation-day-v1': NavigationDay,
    'outdoors-v12': Outdoors,
    'satellite-v9': Satellite,
  }), [])

  const toggleCache = useCallback(() => setCache(!cache), [cache])

  const notify = (message, type = 'default') => {
    toast(message, { type })
  }

  return (
    <AppContext.Provider value={{
      loading, setLoading,
      notify,
      preferences: {
        // drawer
        visibility: drawerVisibility,
        hide: closePreferences,
        show: openPreferences,
        toggle: togglePreferences,
        // color mode
        colorMode: {
          current: mode,
          other: otherColorMode,
          toggle: toggleColorMode,
          light: inLightMode,
          dark: inDarkMode,
        },
        // map style
        mapStyle: {
          current: mapStyle,
          set: setMapStyle,
          baseMap: baseMap[mapStyle],
          baseMapThumbnail: baseMapThumbnails[baseMap[mapStyle]],
          getBaseMap: _mapStyle => baseMap[_mapStyle],
          getBaseMapThumbnail: _mapStyle => baseMapThumbnails[_mapStyle],
        },
        // cache
        cache: {
          enabled: cache,
          toggle: toggleCache,
        },
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
