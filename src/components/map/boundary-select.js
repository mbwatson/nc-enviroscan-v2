import {
  Divider,
  Dropdown,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy'
import {
  Gesture as BoundaryIcon,
  ClearAll as ClearBoundaryIcon,
  ArrowDropUp as ExpandUpIcon,
  Layers as LayersIcon,
  Check as SelectedIcon,
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
        endDecorator={ <ExpandUpIcon /> }
      >
        { boundary.available?.[boundary?.current]?.name || 'No Boundary' }
      </MenuButton>
      <Menu placement="top-start" offset={ 10 }>
        <MenuItem onClick={ handleSelect('census-tracts') }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current === 'census-tracts' ? 'primary' : 'default' } />
          </ListItemDecorator>
          <ListItemContent>
            Census Tracts
          </ListItemContent>
          <ListItemDecorator>
            {
              boundary.current === 'census-tracts'
              ? <SelectedIcon size="sm" color="primary" />
              : null
            }
          </ListItemDecorator>
        </MenuItem>

        <MenuItem onClick={ handleSelect('congressional-districts') }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current === 'congressional-districts' ? 'primary' : 'default' } />
          </ListItemDecorator>
          <ListItemContent>
            Congressional Districts
          </ListItemContent>
          <ListItemDecorator>
            {
              boundary.current === 'congressional-districts'
              ? <SelectedIcon size="sm" color="primary" />
              : null
            }
          </ListItemDecorator>
        </MenuItem>

        <MenuItem onClick={ handleSelect('counties') }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current === 'counties' ? 'primary' : 'default' } />
          </ListItemDecorator>
          <ListItemContent>
            Counties
          </ListItemContent>
          <ListItemDecorator>
            {
              boundary.current === 'counties'
              ? <SelectedIcon size="sm" color="primary" />
              : null
            }
          </ListItemDecorator>
        </MenuItem>

        <MenuItem onClick={ handleSelect('zipcodes') }>
          <ListItemDecorator>
            <BoundaryIcon color={ boundary.current === 'zipcodes' ? 'primary' : 'default' } />
          </ListItemDecorator>
          <ListItemContent>
            ZIP Codes
          </ListItemContent>
          <ListItemDecorator>
            {
              boundary.current === 'zipcodes'
              ? <SelectedIcon size="sm" color="primary" />
              : null
            }
          </ListItemDecorator>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={ () => boundary.set(null) }
          disabled={ !boundary.current }
          color="warning"
        >
          <ListItemDecorator>
            <ClearBoundaryIcon />
          </ListItemDecorator>
          <ListItemContent>
            Unset
          </ListItemContent>
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
