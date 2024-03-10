import * as React from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Inventory as CacheIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const CacheSelect = () => {
  const { preferences } = useAppContext()
  
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={ 2 }
    >
      <CacheToggle />
      <div>
        <Typography level="title-md">
          <strong>{ preferences.cache.enabled ? 'Enabled' : 'Disabled' }</strong>
        </Typography>
        <Typography level="body-xs">
          Enabling cache saves time and enhances your experience
          by saving data in your browser&apos;s local storage.
        </Typography>
      </div>
    </Stack>
  )
}

export const CacheToggle = ({ sx, ...props }) => {
  const { notify, preferences } = useAppContext()

  const handleClick = () => {
    preferences.cache.toggle()
    notify(`Cache is ${ preferences.cache.enabled ? 'dis' : 'en' }abled`, 'success')
  }

  return (
    <IconButton
      id="cache-mode"
      size="lg"
      { ...props }
      onClick={ handleClick }
      sx={ sx }
      color={ preferences.cache.enabled ? 'primary' : 'neutral' }
      variant={ preferences.cache.enabled ? 'solid' : 'outlined' }
    >
      <CacheIcon />
    </IconButton>
  )

}

CacheToggle.propTypes = {
  sx: PropTypes.object,
}
