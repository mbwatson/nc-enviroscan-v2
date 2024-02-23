import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import { NotFoundView } from '../views'

export const Router = () => {

  return (
    <Routes>
      {
        routes.map(({ path, element }) => (
          <Route
            key={ `route-${ path }` }
            path={ path }
            element={ element }
          />
        ))
      }
      <Route path="*" element={ <NotFoundView /> } />
    </Routes>
  )
}

