import * as React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/joy'
import {
  Inventory as CacheIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const CacheToggle = ({ sx, ...props }) => {
  const { preferences } = useAppContext()

  const handleClick = () => {
    preferences.cache.toggle()
  }

  return (
    <IconButton
      id="cache-mode"
      size="lg"
      { ...props }
      onClick={ handleClick }
      sx={ sx }
      color="primary"
      variant={ preferences.cache.enabled ? 'solid' : 'outlined' }
    >
      <CacheIcon />
    </IconButton>
  )

}

CacheToggle.propTypes = {
  sx: PropTypes.object,
}
