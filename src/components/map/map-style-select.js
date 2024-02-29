import { useCallback, useMemo } from 'react'
import {
  Dropdown, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import { useAppContext, useMap } from '@context'
import { Palette as MenuIcon } from '@mui/icons-material'

export const MapStyleSelect = () => {
  const { preferences } = useAppContext()
  const { mapStyle } = useMap()

  // !! room for improvement !! //
  // these need to match options defined
  // in `getBaseMap` of MapContext.
  const options = useMemo(() => [
    { key: 'min',      label: 'Minimal' },
    { key: 'nav',      label: 'Navigation' },
    { key: 'outdoors', label: 'Outdoors' },
    { key: 'sat',      label: 'Satellite' },
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