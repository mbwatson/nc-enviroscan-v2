import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '@context'


// this component stands in front of our views
// checks if a user is authenticated.
// if so, we render the view. otherwise, we
// re-route them back home.
export const ViewGuard = ({ children }) => {
  const { auth } = useAppContext()
  
  if (!auth.user) {
    return <Navigate to="/" />
  }
  return children
}

ViewGuard.propTypes = {
  children: PropTypes.node,
}
