import { useEffect, useState } from 'react'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import { useTheme } from '@mui/joy/styles'
import {
  DarkModeRounded as DarkModeRoundedIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const ColorModeSelect = () => {
  const theme = useTheme()
  const { preferences } = useAppContext()

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={ 2 }
      sx={{
        '.glow': {
          textShadow: `0 0 1px rgba(${theme.vars.palette.primary.mainChannel}), 0 0 3px rgba(${theme.vars.palette.primary.mainChannel})`
        },
      }}
    >
      <ColorModeToggle />
      <div>
        <Typography level="title-md">
          <Typography color="primary" variant="soft">{
            preferences.colorMode.current[0].toUpperCase() + preferences.colorMode.current.slice(1)
          }</Typography> Mode
        </Typography>
        <Typography level="body-xs">
          Click to switch to <Typography className="glow">{ preferences.colorMode.other[0].toUpperCase() + preferences.colorMode.other.slice(1) }</Typography> mode
        </Typography>
      </div>
    </Stack>
  )
}

const ColorModeToggle = () => {
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
      ]}
    >
      <LightModeIcon sx={{ color: 'orange' }} />
      <DarkModeRoundedIcon color="primary" />
    </IconButton>
  )

}
