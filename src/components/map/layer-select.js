import {
  Dropdown, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Biotech as DatasetLayerIcon,
  Gesture as BoundaryIcon,
  Layers as LayersIcon,
} from '@mui/icons-material'
import { useMap } from '@context'

export const LayerSelect = () => {
  const { layers } = useMap()

  const handleSelect = layerId => () => {
    layers.toggle(layerId)
  }

  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="primary"
        startDecorator={ <LayersIcon /> }
      >Layers</MenuButton>
      <Menu placement="top-start" offset={ 10 }>
        <MenuItem onClick={ handleSelect('samples-cluster') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('samples-cluster') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Clustered Samples
        </MenuItem>

        <ListDivider />

        <MenuItem onClick={ handleSelect('counties') }>
          <ListItemDecorator>
            <BoundaryIcon color={ layers.active.includes('counties') ? 'primary' : 'default' } />
          </ListItemDecorator>
          County Boundaries
        </MenuItem>

        <MenuItem onClick={ handleSelect('congressional') }>
          <ListItemDecorator>
            <BoundaryIcon color={ layers.active.includes('congressional') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Congressional District Boundaries
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
