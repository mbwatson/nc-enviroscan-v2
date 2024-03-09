import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useColorScheme } from '@mui/joy/styles'
import { useLocalStorage, useWindowSize } from '@hooks'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppContext = createContext({ })

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
  const windowSize = useWindowSize()
  const { mode, setMode } = useColorScheme()
  const [cache, setCache] = useLocalStorage('use-cache', false)
  const [drawerVisibility, setDrawerVisibility] = useState(true)
  const [loading, setLoading] = useState(false)

  const togglePreferences = () => setDrawerVisibility(!drawerVisibility)
  const closePreferences = () => setDrawerVisibility(false)
  const openPreferences = () => setDrawerVisibility(true)

  const inLightMode = useMemo(() => mode === 'light', [mode])
  const inDarkMode = useMemo(() => mode === 'dark', [mode])
  const otherColorMode = useMemo(() => inDarkMode ? 'light' : 'dark', [mode])
  const toggleColorMode = useCallback(() => setMode(otherColorMode), [mode])

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
