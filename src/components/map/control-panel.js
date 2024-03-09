import {
  Card,
  List,
  ListItem,
  Tooltip,
} from '@mui/joy'
import { LayerSelect } from './layer-select'
import { BoundarySelect } from './boundary-select'
import { LocationSelect } from './location-select'

export const ControlPanel = () => {

  return (
    <Card sx={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      m: 2,
      overflow: 'hidden',
      px: 0.5, py: 1, pr: 1,
      overflowX: 'auto',
      '.MuiList-root': {
        p: 0,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
      },
      '.MuiButton-root': { gap: 1 },
    }}>
      <List orientation="horizontal" size="sm">
        <ListItem role="none">
          <LayerSelect />
          <BoundarySelect />
        </ListItem>

        <Tooltip placement="bottom" title="Locations">
          <ListItem role="none">
            <LocationSelect />
          </ListItem>
        </Tooltip>
        
      </List>

    </Card>
  )
}
