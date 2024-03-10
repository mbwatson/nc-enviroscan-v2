import { App } from './app'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import {
  AppContextProvider,
  DataProvider,
  MapProvider,
} from '@context'
import theme from './theme'
import './index.css'
import '@fontsource/inter'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <CssVarsProvider theme={ theme } defaultMode="light">
    <HashRouter>
      <DataProvider>
        <AppContextProvider>
          <MapProvider>
            <App />
          </MapProvider>
        </AppContextProvider>
      </DataProvider>
    </HashRouter>
  </CssVarsProvider>
)

root.render(<ProvisionedApp />)
