import { useCallback, useState } from 'react'
import {
  Divider, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Room as LocationMarker,
  LocationSearching as CrosshairsIcon,
} from '@mui/icons-material'
import { useMap } from '@context'

export const LocationSelect = () => {
  const [busy, setBusy] = useState(false)
  const { flyTo, locationPresets, mapRef } = useMap()

  const handleSelect = useCallback(({ longitude, latitude }) => () => {
    flyTo({ longitude, latitude })
  }, [mapRef.current])

  const handleClickMyLocation = () => {
    setBusy(true)
    if (navigator.geolocation) {
      // get the user's current location
      navigator.geolocation.getCurrentPosition(
        // save the geolocation coordinates in two variables
        position => {
          const { latitude, longitude } = position.coords
          flyTo({ latitude, longitude })
          setBusy(false)
        },
        // if there was an error getting the user's location
        error => {
          console.error('Error getting user location:', error);
          setBusy(false)
        }
      )
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  return (
    <Dropdown>
      <MenuButton loading={ busy }>
        <CrosshairsIcon />
      </MenuButton>
      <Menu>
        {
          locationPresets.map(({ latitude, longitude, label }) => (
            <MenuItem
              key={ label }
              onClick={ handleSelect({ latitude, longitude }) }
            >
              <ListItemDecorator><LocationMarker /></ListItemDecorator>
              { label }
            </MenuItem>
          ))
        }
        <Divider />
        <MenuItem
          key="my-location"
          onClick={ handleClickMyLocation }
        >
          <ListItemDecorator><CrosshairsIcon /></ListItemDecorator>
          My Location
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
