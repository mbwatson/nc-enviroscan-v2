import * as React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/joy'
import {
  DarkModeRounded as DarkModeRoundedIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const ColorModeToggle = ({ sx, ...props }) => {
  const { preferences } = useAppContext()

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <IconButton
        size="lg"
        color="neutral"
        { ...props }
        sx={ sx }
        disabled
      />
    )
  }

  return (
    <IconButton
      id="toggle-color-mode"
      size="lg"
      color="neutral"
      { ...props }
      onClick={ preferences.colorMode.toggle }
      sx={[
        {
          '& > *:first-of-type': {
            display: preferences.colorMode.dark ? 'none' : 'initial',
          },
          '& > *:last-of-type': {
            display: preferences.colorMode.light ? 'none' : 'initial',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  )

}

ColorModeToggle.propTypes = {
  sx: PropTypes.object,
}
