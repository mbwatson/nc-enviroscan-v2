import {
  Divider, Dropdown, ListItemDecorator,
  Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Grid3x3 as BoundaryIcon,
  Layers as LayersIcon,
} from '@mui/icons-material'
import { useMap } from '@context'

export const BoundarySelect = () => {
  const { boundary } = useMap()

  const handleSelect = layerId => event => {
    event.stopPropagation()
    boundary.set(layerId)
  }

  return (
    <Dropdown>
      <MenuButton
        color="primary"
        variant={ boundary.current ? 'solid' : 'soft' }
        startDecorator={ <LayersIcon /> }
      >Boundary: { boundary.available?.[boundary?.current]?.name || 'None' }</MenuButton>
      <Menu placement="top-start" offset={ 10 }>
        <MenuItem onClick={ handleSelect('census-tracts') }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current === 'census-tracts' ? 'primary' : 'default' } />
          </ListItemDecorator>
          Census Tracts
        </MenuItem>

        <MenuItem onClick={ handleSelect('counties') }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current === 'counties' ? 'primary' : 'default' } />
          </ListItemDecorator>
          Counties
        </MenuItem>

        <Divider />

        <MenuItem onClick={ () => boundary.set(null) }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current ? 'default' : 'primary' } />
          </ListItemDecorator>
          None
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
