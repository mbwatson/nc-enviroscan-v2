import PropTypes from 'prop-types'
import { LinearProgress, Stack, Sheet } from '@mui/joy'
import { useAppContext } from '@context'
import { Menu } from '@components/layout/nav-menu'

//

export const Header = ({ menuLinks, actions }) => {
  const { loading, preferences } = useAppContext()

  return (
    <Sheet
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 9,
        borderBottom: '1px solid',
        borderColor: preferences.colorMode.light ? 'primary.100' : 'primaryDark.700',
      }}
    >
      <LinearProgress
        variant="soft"
        size="md"
        color="primary"
        determinate={ !loading }
        value={ loading ? undefined : 0 }
      />

      <Stack
        flexDirection="row"
        justifyContent="space-between"
        sx={{ p: 1, height: '4rem' }}
      >
        <Menu options={ menuLinks } />
        <Stack
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={ 1 }
        >
          { actions }
        </Stack>
      </Stack>
    </Sheet>
  )
}

Header.propTypes = {
  menuLinks: Menu.propTypes.options,
  actions: PropTypes.arrayOf(PropTypes.node),
}
