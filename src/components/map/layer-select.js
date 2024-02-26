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
          Clustered Sample Data
        </MenuItem>

        <ListDivider />

        <MenuItem onClick={ handleSelect('hospitals') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('hospitals') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Hospitals
        </MenuItem>

        <ListDivider />

        <MenuItem onClick={ handleSelect('public-schools') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('public-schools') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Public Schools
        </MenuItem>

        <ListDivider />

        <MenuItem onClick={ handleSelect('non-public-schools') }>
          <ListItemDecorator>
            <DatasetLayerIcon color={ layers.active.includes('non-public-schools') ? 'primary' : 'default' } />
          </ListItemDecorator>
          Non-public Schools
        </MenuItem>

        <ListDivider />

        <MenuItem onClick={ handleSelect('counties') }>
          <ListItemDecorator>
            <BoundaryIcon color={ layers.active.includes('counties') ? 'primary' : 'default' } />
          </ListItemDecorator>
          County Boundaries
        </MenuItem>

      </Menu>
    </Dropdown>
  )
}
