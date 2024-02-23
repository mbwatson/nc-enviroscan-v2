import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useColorScheme } from '@mui/joy/styles'
import { useAuth, useData } from '@context'
import { useWindowSize } from '@hooks'

const AppContext = createContext({ })

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
  const windowSize = useWindowSize()
  const auth = useAuth()
  const { mode, setMode } = useColorScheme()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePreferences = () => setDrawerVisibility(!drawerVisibility)
  const closePreferences = () => setDrawerVisibility(false)
  const openPreferences = () => setDrawerVisibility(true)

  const inLightMode = useMemo(() => mode === 'light', [mode])
  const inDarkMode = useMemo(() => mode === 'dark', [mode])
  const otherColorMode = useMemo(() => inDarkMode ? 'light' : 'dark', [mode])
  const toggleColorMode = useCallback(() => setMode(otherColorMode), [mode])

  // interface with the `useAuth` hook via these functions.
  // these are simply wrappers around the auth functions,
  // allowing injection of custom app-related logic here,
  // while not cluttering the isolated authentiation logic.
  const userLogin = (/*creds*/) => {
    loadSomething() // pretend to hit API
      .then(auth.login)
  }
  const userLogout = (/*creds*/) => {
    loadSomething() // pretend to hit API
      .then(auth.logout)
  }

  // this function lets us simulate async functionality.
  const loadSomething = () => {
    setLoading(true)
    return new Promise(resolve => {
      setTimeout(() => {
        setLoading(false)
        resolve(1)
      }, 2000)
    })
  }

  return (
    <AppContext.Provider value={{
      auth: {
        user: auth.user,
        login: userLogin,
        logout: userLogout,
      },
      loading, setLoading, loadSomething,
      preferences: {
        visibility: drawerVisibility,
        hide: closePreferences,
        show: openPreferences,
        toggle: togglePreferences,
        colorMode: {
          current: mode,
          other: otherColorMode,
          toggle: toggleColorMode,
          light: inLightMode,
          dark: inDarkMode,
        },
      },
      windowSize,
      data: useData(),
    }}>
      { children }
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}
