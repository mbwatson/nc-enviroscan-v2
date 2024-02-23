import PropTypes from 'prop-types'
import {
  Dropdown,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Menu as JoyMenu,
  MenuButton,
  MenuItem,
} from '@mui/joy'
import { Menu as MenuIcon } from '@mui/icons-material'
import { Link } from '@components/link'
import { useWindowSize } from '@hooks'
import { useAppContext } from '@context'

//

const MOBILE_MENU_THRESHOLD = 775

export const menuOptionsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
).isRequired

export const Menu = ({ options }) => {
  const { preferences } = useAppContext()
  const { width } = useWindowSize()
  
  const DesktopMenu = () => {
    return (
      <List
        role="menubar"
        orientation="horizontal"
        color="primary"
        sx={{
          justifyContent: 'flex-start',
          gap: 1,
          p: 0,
          '.MuiListItemButton-root': {
            color: preferences.colorMode.light ? 'primary.500' : 'primary.contrastText',
            transition: 'background-color 250ms',
            borderRadius: 'md',
            '&[aria-current="page"]': {
              pointerEvents: 'none',
              color: preferences.colorMode.light ? 'primary.700' : 'primaryDark.100',
              backgroundColor: preferences.colorMode.light ? 'primary.200' : 'primaryDark.600',
            },
          },
        }}
      >
        {
          options.map(({ icon, label, path }) => (
            <ListItem role="none" key={ path }>
              <ListItemButton
                role="menuitem"
                component={ Link }
                nav to={ path }
                aria-label={ label }
              >
                <ListItemDecorator>
                  { icon }
                </ListItemDecorator>
                { label }
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    )
  }

  const MobileMenu = () => {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          size="lg"
          color="primary"
          variant="soft"
        >
          <MenuIcon />
        </MenuButton>
        <JoyMenu placement="bottom-start" size="lg" sx={{
          '.MuiMenuItem-root': {
            borderRadius: 0,
            color: preferences.colorMode.light ? 'primary.500' : 'primary.contrastText',
            transition: 'background-color 250ms',
            '&[aria-current="page"]': {
              pointerEvents: 'none',
              color: preferences.colorMode.light ? 'primary.700' : 'primaryDark.100',
              backgroundColor: preferences.colorMode.light ? 'primary.200' : 'primaryDark.600',
            },
          },
        }}>
          {
            options.map(({ icon, label, path }) => (
              <MenuItem
                key={ path }
                role="menuitem"
                component={ Link }
                nav to={ path }
                aria-label={ label }
              >
                <ListItemDecorator>{ icon }</ListItemDecorator>
                { label }
              </MenuItem>
            ))
          }
        </JoyMenu>
      </Dropdown>
    )
  }


  if (width < MOBILE_MENU_THRESHOLD) {
    return <MobileMenu />
  }
  return <DesktopMenu />
}

Menu.propTypes = {
  options: menuOptionsPropTypes,
}

