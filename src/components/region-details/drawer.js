import { useMemo } from 'react'
import {
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Sheet,
  Stack,
} from '@mui/joy'
import { useMap } from '@context'
import { RegionFeatures } from './region-features'
import { RegionMetadata } from './region-metadata'

const regionTitle = region => {
  if (!region) {
    return '...'
  }
  if (region.layer.source === 'counties') {
    return `${ region.properties.CountyName } County`
  }
  if (region.layer.source === 'census-tracts') {
    return region.properties.NAMELSAD
  }
  return 'Unrecognized Region'
}

export const ActiveRegionDrawer = () => {
  const { activeRegion } = useMap()

  const drawerTitle = useMemo(
    () => regionTitle(activeRegion.current),
    [activeRegion.current]
  )

  return (
    <Drawer
      anchor="left"
      size="lg"
      open={ !!activeRegion.current }
      onClose={ () => activeRegion.set(null) }
      slotProps={{
        backdrop: { sx: {
          bgcolor: 'transparent',
          backdropFilter: 'none',
        }, },
        content: { sx: {
          bgcolor: 'transparent',
          px: 2,
          py: 11,
          boxShadow: 'none',
          width: '100%',
          maxWidth: '750px',
        }, },
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: { xs: 0, sm: 'md' },
          height: '100%',
          overflow: 'auto',
          '.MuiDialogTitle-root': {
            position: 'sticky',
            zIndex: 2,
            top: 0,
            p: 2,
            backgroundColor: 'background.surface',
          },
          '& > .MuiStack-root > .MuiTypography-root': {
            px: 2,
          },
        }}
      >
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          gap={ 2 }
        >
          <DialogTitle>{ drawerTitle }</DialogTitle>
          <ModalClose size="lg" sx={{ zIndex: 9 }}/>
          
          <Divider />

          <DialogContent>
            <RegionFeatures />
          </DialogContent>

          <Divider />

          <DialogContent>
            <RegionMetadata />
          </DialogContent>

          <Divider />
          
        </Stack>
      </Sheet>
    </Drawer>
  )
}
