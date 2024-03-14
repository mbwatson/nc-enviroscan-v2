import * as React from 'react'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import {
  LocationSearching as MarkerIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const CenterMarker = () => {
  const { preferences } = useAppContext()
  
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={ 2 }
    >
      <CenterMarkerToggle />
      <div>
        <Typography level="title-md">
          Center Marker <Typography variant="soft" color="primary">{
            preferences.showCenterMarker.enabled ? 'Enabled' : 'Disabled'
          }</Typography>
        </Typography>
        <Typography level="body-xs">
          Enabling this renders a crosshairs at the
          center of the map&apos;s current viewport.
        </Typography>
      </div>
    </Stack>
  )
}

export const CenterMarkerToggle = () => {
  const { notify, preferences } = useAppContext()

  const handleClick = () => {
    preferences.showCenterMarker.toggle()
    notify(`Center Marker is ${ preferences.showCenterMarker.enabled ? 'dis' : 'en' }abled`, 'success')
  }

  return (
    <IconButton
      id="showCenterMarker-mode"
      size="lg"
      onClick={ handleClick }
      variant="outlined"
    >
      <MarkerIcon
        color={ preferences.showCenterMarker.enabled ? 'primary' : 'neutral' }
      />
    </IconButton>
  )
}
