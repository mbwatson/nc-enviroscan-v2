import {
  CircularProgress, Dropdown, ListDivider, ListItemDecorator,
  Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Place as DataLayerIcon,
  Gesture as BoundaryIcon,
  Layers as LayersIcon,
} from '@mui/icons-material'
import { useData, useMap } from '@context'

export const LayerSelect = () => {
  const { layers } = useMap()
  const { layerData } = useData()

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
        {
          Object.keys(layerData).map(key => (
            <MenuItem key={ key } onClick={ handleSelect(key) }>
              <ListItemDecorator>
                {
                  layerData[key].isPending
                  ? <CircularProgress variant="soft" size="sm" />
                  : <DataLayerIcon color={ layers.active.includes(key) ? 'primary' : 'default' } />
                }
              </ListItemDecorator>
              { layers.available[key].name }
            </MenuItem>
          ))
        }

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
