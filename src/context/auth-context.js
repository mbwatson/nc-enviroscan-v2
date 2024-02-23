import { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '@hooks'

const AuthContext = createContext({ })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage('user', null)

  const login = () => {
    setUser({ username: 'fake_user' })
  }

  const logout = () => {
    setUser(null)
    navigate("/", { replace: true })
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
