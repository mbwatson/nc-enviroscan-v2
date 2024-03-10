import {
  CircularProgress,
  Divider,
  Dropdown,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy'
import {
  Place as DataLayerIcon,
  ClearAll as ClearLayersIcon,
  ArrowDropUp as ExpandUpIcon,
  Layers as LayersIcon,
  Check as SelectedIcon,
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
        color="primary"
        variant={ layers.active.length > 0 ? 'solid' : 'soft' }
        startDecorator={ <LayersIcon /> }
        endDecorator={ <ExpandUpIcon /> }
      >Layers { layers.active.length > 0 ? `(${ layers.active.length })` : '' }</MenuButton>
      <Menu placement="top-start" offset={ 10 }>
        {
          Object.keys(layerData)
            .sort()
            .map(key => (
              <MenuItem key={ key } onClick={ handleSelect(key) } disabled={ layerData[key].isPending }>
                <ListItemDecorator>
                  {
                    layerData[key].isPending
                    ? <CircularProgress variant="soft" size="sm" />
                    : <DataLayerIcon color={ layers.active.includes(key) ? 'primary' : 'default' } />
                  }
                </ListItemDecorator>
                <ListItemContent>
                  { layers.available[key].name }
                </ListItemContent>
                <ListItemDecorator>
                  {
                    layers.active.includes(key)
                    ? <SelectedIcon size="sm" color="primary" />
                    : null
                  }
                </ListItemDecorator>
              </MenuItem>
            ))
        }
        
        <Divider />

        <MenuItem
          onClick={ () => layers.clear() }
          disabled={ layers.active.length === 0 }
          color="warning"
        >
          <ListItemDecorator>
            <ClearLayersIcon />
          </ListItemDecorator>
          Deselect All
        </MenuItem>

      </Menu>
    </Dropdown>
  )
}
