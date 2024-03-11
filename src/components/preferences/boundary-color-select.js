import { Fragment, useState } from 'react'
import {
  Avatar, Box, Button, IconButton, Stack, Typography,
} from '@mui/joy'
import { useAppContext } from '@context'
import { HexColorPicker } from 'react-colorful'

export const BoundaryColorSelect = () => {
  const { preferences } = useAppContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const [tempColor, setTempColor] = useState(preferences.mapStyle.boundaryColor.current)
  const open = Boolean(anchorEl)
  
  const id = open ? 'boundary-color-picker' : undefined
  
  const handleClickToggleOpen = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClickConfirm = () => {
    preferences.mapStyle.boundaryColor.set(tempColor)
    setAnchorEl(null)
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      gap={ 2 }
      sx={{
        '.picker-container': {
          pr: 2,
        },
        '.react-colorful': { height: '100px', width: '100%', },
        '.react-colorful__pointer': { height: '16px', width: '16px', },
        '.react-colorful__hue': { height: '16px', },
        '.react-colorful__hue-pointer': { height: '16px', width: '16px', },
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={ 2 }
      >
        <IconButton
          id={ id }
          size="lg"
          variant="outlined"
          color="neutral"
          onClick={ handleClickToggleOpen }
          aria-describedby="boundary-color-picker"
        >
          <Avatar
            size="sm"
            sx={{
              borderRadius: '15%',
              backgroundColor: preferences.mapStyle.boundaryColor.current,
            }}
          >{' '}</Avatar>
        </IconButton>
        <Box sx={{ flex: 1 }}>
          {
            open ? (
              <Stack gap={ 1 } className="picker-container">
                <HexColorPicker color={ tempColor } onChange={ color => setTempColor(color) } />
                <Button fullWidth onClick={ handleClickConfirm }>OK</Button>
              </Stack>
            ) : (
              <Fragment>
                <Typography level="title-md">Boundary Color</Typography>
                <Typography level="body-xs" sx={{
                  color: preferences.mapStyle.boundaryColor.current,
                }}>{ preferences.mapStyle.boundaryColor.current }</Typography>
              </Fragment>
            )
          }
        </Box>
      </Stack>
    </Stack>
  )
}
