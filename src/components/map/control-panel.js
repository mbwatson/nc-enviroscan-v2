import {
  Card,
  List,
  ListDivider,
  ListItem,
  Tooltip,
} from '@mui/joy'
import { LayerSelect } from './layer-select'
import { LocationSelect } from './location-select'
import { MapStyleSelect } from './map-style-select'

export const ControlPanel = () => {

  return (
    <Card sx={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: '2rem',
      left: '2rem',
      right: '2rem',
      overflow: 'hidden',
      px: 0.5, py: 1, pr: 1,
      overflowX: 'auto',
      '.MuiList-root': { p: 0 },
      '.MuiButton-root': { gap: 1 },
    }}>
      <List orientation="horizontal" size="sm" sx={{ flex: 1 }}>
        <ListItem role="none">
          <LayerSelect />
        </ListItem>

        <ListDivider />

        <Tooltip placement="bottom" title="Locations">
          <ListItem role="none">
            <LocationSelect />
          </ListItem>
        </Tooltip>
        
        <ListDivider />

        <Tooltip placement="bottom" title="Map Style">
          <ListItem role="none">
            <MapStyleSelect />
          </ListItem>
        </Tooltip>
        
      </List>

    </Card>
  )
}
