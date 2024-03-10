import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import {
  DarkModeRounded as DarkModeRoundedIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const ColorModeSelect = () => {
  const { preferences } = useAppContext()

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={ 2 }
    >
      <ColorModeToggle />
      <div>
        <Typography level="title-md">
          <Typography color="primary" variant="soft">{
            preferences.colorMode.current[0].toUpperCase() + preferences.colorMode.current.slice(1)
          }</Typography> Mode
        </Typography>
        <Typography level="body-xs">
          Click to swap to <strong>{ preferences.colorMode.other[0].toUpperCase() + preferences.colorMode.other.slice(1) }</strong> mode
        </Typography>
      </div>
    </Stack>
  )
}

const ColorModeToggle = ({ sx, ...props }) => {
  const { preferences } = useAppContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
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
      variant="outlined"
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
      <LightModeIcon sx={{ color: 'orange' }} />
      <DarkModeRoundedIcon color="primary" />
    </IconButton>
  )

}

ColorModeToggle.propTypes = {
  sx: PropTypes.object,
}
