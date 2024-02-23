import { Fragment, useMemo } from 'react'
import { Sheet } from '@mui/joy'
import { AuthMenu } from '@components/auth'
import { useAppContext } from '@context'
import { routes, Router } from './router'
import { Header } from './components/layout'

import { ColorModeToggle, PreferencesDrawer } from '@components/preferences'

//

export const App = () => {
  const { auth, pageRef, preferences } = useAppContext()

  const headerActions = useMemo(() => {
    let actions = [<AuthMenu key="auth-action-button" />]
    if (auth.user) {
      actions = [
        <ColorModeToggle key="color-mode-action-button" />,
        ...actions,
      ]
    }
    return actions
  }, [auth.user])

  const menuItems = useMemo(() => {
    if (!auth.user) {
      return routes.filter(r => !r.requiresAuth)
    }
    return routes 
  }, [auth.user])

  return (
    <Fragment>
      <Header
        menuLinks={ menuItems }
        actions={ headerActions }
      />
      
      <Sheet component="main" ref={ pageRef } className={ preferences.colorMode.dark ? 'dark-mode' : 'light-mode' }>
        <Router />
      </Sheet>

      <PreferencesDrawer />

    </Fragment>
  )
}
