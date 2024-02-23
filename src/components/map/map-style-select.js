import { useCallback, useMemo } from 'react'
import {
  Dropdown, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import { useAppContext, useMap } from '@context'
import { Palette as MenuIcon } from '@mui/icons-material'

export const MapStyleSelect = () => {
  const { preferences } = useAppContext()
  const { mapStyle } = useMap()

  const options = useMemo(() => [
    {
      key: 'min',
      label: 'Minimal',
      baseMap: preferences.colorMode.dark ? 'dark-v11' : 'light-v11',
    },
    {
      key: 'nav',
      label: 'Navigation',
      baseMap: preferences.colorMode.dark ? 'navigation-night-v1' : 'navigation-day-v1',
    },
    {
      key: 'sat',
      label: 'Satellite',
      baseMap: 'satellite-v9',
    },
], [preferences.colorMode])

  const handleSelect = useCallback(newBaseMap => () => {
    mapStyle.set(newBaseMap)
  }, [])

  return (
    <Dropdown>
      <MenuButton>
        <MenuIcon />
      </MenuButton>
      <Menu>
        {
          options.map(option => (
            <MenuItem
              key={ option.key }
              onClick={ handleSelect(option.key) }
              selected={ mapStyle.current === option.key }
            >{ option.label }</MenuItem>
          ))
        }
      </Menu>
    </Dropdown>
  )
}