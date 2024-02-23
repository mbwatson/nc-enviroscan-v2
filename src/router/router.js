import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import { NotFoundView } from '../views'
import { ViewGuard } from './view-guard'

export const Router = () => {
  // we'll split off the protected routes,
  // and render them inside of our view protector
  // component, `ViewGuard`.
  const routeBuckets = routes.reduce(({ closedRoutes, openRoutes }, r) => {
    if (r.requiresAuth) {
      closedRoutes.push(r)
      return { closedRoutes, openRoutes }
    }
    openRoutes.push(r)
    return { closedRoutes, openRoutes }
  }, { closedRoutes: [], openRoutes: [] })

  return (
    <Routes>
      {
        // unprotected routes
        routeBuckets.openRoutes.map(({ path, element }) => (
          <Route
            key={ `route-${ path }` }
            path={ path }
            element={ element }
          />
        ))
      }
      {
        // protected routes
        routeBuckets.closedRoutes.map(({ path, element }) => (
          <Route
            key={ `route-${ path }` }
            path={ path }
            element={ <ViewGuard>{ element }</ViewGuard> }
          />
        ))
      }
      <Route path="*" element={ <NotFoundView /> } />
    </Routes>
  )
}

