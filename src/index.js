import { App } from './app'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import {
  AppContextProvider,
  AuthProvider,
  DataProvider,
  MapProvider,
} from '@context'
import theme from './theme'
import './index.css'
import '@fontsource/inter'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <QueryClientProvider client={ queryClient }>
    <CssVarsProvider theme={ theme } defaultMode="light">
      <HashRouter>
        <AuthProvider>
          <DataProvider>
            <AppContextProvider>
              <MapProvider>
                <App />
              </MapProvider>
            </AppContextProvider>
          </DataProvider>
        </AuthProvider>
      </HashRouter>
    </CssVarsProvider>
  </QueryClientProvider>
)

root.render(<ProvisionedApp />)
