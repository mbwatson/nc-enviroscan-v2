import { Fragment, useMemo } from 'react'
import { Sheet } from '@mui/joy'
import { useAppContext } from '@context'
import { Header } from '@components/layout'
import { routes as menuItems, Router } from './router'
import { Preferences } from '@components/preferences'
import { PreferencesDrawer } from '@components/preferences'
import { ActiveRegionDrawer } from '@components/region-details'
import { ToastContainer } from 'react-toastify'

//

export const App = () => {
  const { pageRef, preferences } = useAppContext()

  const headerActions = useMemo(() => {
    let actions = []
    actions = [
      <Preferences key="preferences" />,
      ...actions,
    ]
    return actions
  }, [])

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

      <ActiveRegionDrawer />

      <ToastContainer
        position="top-center"
        autoClose={ 5000 }
        newestOnTop={ false }
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={ preferences.colorMode.current }
      />

    </Fragment>
  )
}
