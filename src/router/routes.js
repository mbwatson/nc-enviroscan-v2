import {
  Dashboard as DashboardIcon,
  QueryStats as AnalysisIcon,
  Map as MapIcon,
  Info as AboutIcon,
  HeadsetMic as ContactIcon,
} from '@mui/icons-material'
import {
  AboutView,
  AnalysisView,
  ContactView,
  HomeView,
  MapView,
} from '../views'

// this array is used to define both
//   (1) routes (for react-router) and
//   (2) main menu links
export const routes = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    requiresAuth: false,
    element: <HomeView />,
  },
  {
    path: '/analysis',
    label: 'Analysis',
    icon: <AnalysisIcon />,
    requiresAuth: true,
    element: <AnalysisView />,
  },
  {
    path: '/map',
    label: 'Map',
    icon: <MapIcon />,
    requiresAuth: true,
    element:  <MapView />,
  },
  {
    path: '/about',
    label: 'About',
    icon: <AboutIcon />,
    requiresAuth: false,
    element: <AboutView />,
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: <ContactIcon />,
    requiresAuth: false,
    element: <ContactView />,
  },
]

