import {
  Button,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  ListItemContent,
  Typography,
} from '@mui/joy'
import {
  AccountCircle as ProfileIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Tune as PreferencesIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

//

export const AuthMenu = () => {
  const { auth, loading, preferences } = useAppContext()

  const handleClickLogout = () => {
    auth.logout()
  }

  const handleClickLogin = () => {
    auth.login()
  }

  const handleClickPreferences = () => {
    preferences.show()
  }

  if (!auth.user) {
    return (
      <Button
        loading={ loading }
        variant="soft"
        size="lg"
        onClick={ handleClickLogin }
        startDecorator={ <LoginIcon /> }
      >Login</Button>
    )
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { size: 'lg', color: 'primary' } }}
      ><ProfileIcon /></MenuButton>

      <Menu placement="bottom-end">
        <MenuItem>
          <ListItemDecorator>
            <ProfileIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="body-sm">Logged in as</Typography>
            <Typography level="body-md">{ auth.user.username }</Typography>
          </ListItemContent>
        </MenuItem>

        <ListDivider />

        <MenuItem onClick={ handleClickPreferences }>
          <ListItemDecorator>
            <PreferencesIcon />
          </ListItemDecorator>
          Preferences
        </MenuItem>
        
        <ListDivider />

        <MenuItem onClick={ handleClickLogout }>
          <ListItemDecorator>
            <LogoutIcon />
          </ListItemDecorator>
          Logout
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
