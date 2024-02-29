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
                  Current: <Typography color="primary" variant="soft">{
                    preferences.colorMode.current[0].toUpperCase() + preferences.colorMode.current.slice(1)
                  }</Typography>
                </Typography>
                <Typography level="body-xs">
                  Click to swap to <strong>{ preferences.colorMode.other[0].toUpperCase() + preferences.colorMode.other.slice(1) }</strong> mode
                </Typography>
              </div>
            </Stack>
          </DialogContent>

          <Divider />
          
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
                  While it persists a fair amount of raw data on your machine,
                  it only needs to be requested once, saving time.
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
