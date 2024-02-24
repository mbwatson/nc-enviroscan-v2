import {
  Map as MapIcon,
} from '@mui/icons-material'
import {
  MapView,
} from '../views'

// this array is used to define both
//   (1) routes (for react-router) and
//   (2) main menu links
export const routes = [
  {
    path: '/',
    label: 'Map',
    icon: <MapIcon />,
    requiresAuth: true,
    element:  <MapView />,
  },
]

