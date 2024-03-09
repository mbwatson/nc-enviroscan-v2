import { Fragment } from 'react'
import {
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  ModalClose,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import { Tune as MenuIcon } from '@mui/icons-material'
import { useAppContext } from '@context'
import { CacheToggle } from './cache-toggle'
import { ColorModeToggle } from './color-mode-toggle'
import { MapStyleSelect } from './map-style-select'

export const PreferencesDrawer = () => {
  const { preferences } = useAppContext()

  return (
    <Drawer
      anchor="right"
      size="md"
      open={ preferences.visibility }
      onClose={ preferences.hide }
      slotProps={{
        content: {
          sx: {
            bgcolor: 'transparent',
            p: { lg: 4, md: 2, sm: 1, xs: 0 },
            boxShadow: 'none',
          },
        },
      }}
    >
      <Sheet sx={{
        borderRadius: { xs: 0, sm: 'md' },
        p: 2,
        height: '100%',
        overflow: 'auto',
        '.MuiDivider-root:first-of-type': { mb: 2 },
        '.MuiDivider-root:not(:first-of-type)': { my: 2 },
      }}>
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          gap={ 2 }
        >
          <DialogTitle>Preferences</DialogTitle>
          <ModalClose size="lg" />
          
          <Divider />

          {/* Color Mode */}
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography level="title-lg">Color Mode</Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={ 2 }
            >
              <ColorModeToggle />
              <div>
                <Typography level="title-md">
                  In <Typography color="primary" variant="soft">{
                    preferences.colorMode.current[0].toUpperCase() + preferences.colorMode.current.slice(1)
                  }</Typography> Mode
                </Typography>
                <Typography level="body-xs">
                  Click to swap to <strong>{ preferences.colorMode.other[0].toUpperCase() + preferences.colorMode.other.slice(1) }</strong> mode
                </Typography>
              </div>
            </Stack>
          </DialogContent>

          <Divider />

          {/* Map Style */}
          <DialogContent sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '.MuiSelect-root': { flex: 1 },
          }}>
            <Typography level="title-lg">Map Style</Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={ 2 }
            >
              <Typography level="title-md">Base Map:</Typography>
              <MapStyleSelect />
            </Stack>
          </DialogContent>

          <Divider />
          
          {/* Caching */}
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography level="title-lg">Cache</Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={ 2 }
            >
              <CacheToggle />
              <div>
                <Typography level="title-md">
                  <strong>{ preferences.cache.enabled ? 'Enabled' : 'Disabled' }</strong>
                </Typography>
                <Typography level="body-xs">
                  Enabling cache saves time and enhances your experience
                  by saving data in your browser&apos;s local storage.
                </Typography>
              </div>
            </Stack>
          </DialogContent>

          <Divider />
          
        </Stack>
      </Sheet>
    </Drawer>
  )
}

export const PreferencesToggle = () => {
  const { preferences } = useAppContext()

  return (
    <IconButton
      size="lg"
      color="neutral"
      onClick={ preferences.toggle }
    >
      <MenuIcon />
    </IconButton>
  )
}


// all-in-one button and drawer.
// use this for an ever-present toggle button.
export const Preferences = () => {
  return (
    <Fragment>
      <PreferencesToggle />
      <PreferencesDrawer />
    </Fragment>
  )
}
