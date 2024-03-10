import * as React from 'react'
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import {
  FitScreen as ZoomToRegionIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const ZoomToRegionSelect = () => {
  const { preferences } = useAppContext()
  
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={ 2 }
    >
      <ZoomToRegionToggle />
      <div>
        <Typography level="title-md">
          Zoom-to-Selection <Typography variant="soft" color="primary">{
            preferences.shouldZoomToRegion.enabled ? 'Enabled' : 'Disabled'
          }</Typography>
        </Typography>
        <Typography level="body-xs">
          With this enabled, selecting a region will adjust the
          map viewport to fit the region in the available space.
        </Typography>
      </div>
    </Stack>
  )
}

const ZoomToRegionToggle = () => {
  const { notify, preferences } = useAppContext()

  const handleClick = () => {
    preferences.shouldZoomToRegion.toggle()
    notify(`Zoom to Region is ${ preferences.shouldZoomToRegion.enabled ? 'dis' : 'en' }abled`, 'success')
  }

  return (
    <IconButton
      id="zoom-to-bounds-mode"
      size="lg"
      onClick={ handleClick }
      variant="outlined"
    >
      <ZoomToRegionIcon
        color={ preferences.shouldZoomToRegion.enabled ? 'primary' : 'neutral' }
      />
    </IconButton>
  )

}
