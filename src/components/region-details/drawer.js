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

export const ActiveRegionDrawer = () => {
  const { activeRegion } = useMap()

  const title = useMemo(() => {
    if (!activeRegion.current) {
      return '...'
    }
    if (activeRegion.current.layer.source === 'counties') {
      return `${ activeRegion.current.properties.CountyName } County`
    }
    if (activeRegion.current.layer.source === 'census-tracts') {
      return activeRegion.current.properties.NAMELSAD
    }
  }, [activeRegion.current])

  return (
    <Drawer
      anchor="left"
      size="lg"
      open={ !!activeRegion.current }
      onClose={ () => activeRegion.set(null) }
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'transparent',
            backdropFilter: 'none',
          },
        },
        content: {
          sx: {
            bgcolor: 'transparent',
            p: 4,
            pt: 13,
            pb: 16,
            boxShadow: 'none',
            width: '100%',
            maxWidth: '750px',
          },
        },
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: { xs: 0, sm: 'md' },
          p: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          gap={ 2 }
        >
          <DialogTitle>{ title }</DialogTitle>
          <ModalClose size="lg" />
          
          <Divider />

          <DialogContent>
            Qui velit ut in labore quis velit officia anim tempor consectetur est cillum commodo.
            Occaecat do anim dolor exercitation eiusmod mollit occaecat cupidatat sed quis qui occaecat anim sit.
            Lorem ipsum sit elit excepteur nostrud et quis sit commodo voluptate sint.
          </DialogContent>

          <Divider />
          
        </Stack>
      </Sheet>
    </Drawer>
  )
}
