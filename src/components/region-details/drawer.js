import { useMemo, useState } from 'react'
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
import { deepValue } from '@util'
import { Resizable } from 're-resizable'

export const ActiveRegionDrawer = () => {
  const [width, setWidth] = useState(700)
  const { activeRegion, boundary } = useMap()

  const drawerTitle = useMemo(() => {
    if (!activeRegion.current || !boundary.available) {
      return '...'
    }
    const { accessor, nameSingular } = boundary.available[boundary.current]
    return `${ nameSingular } / ${ deepValue(activeRegion.current, accessor.name) ?? 'Unrecognized Region' }`
  }, [activeRegion.current, boundary.available])

  return (
    <Drawer
      anchor="left"
      open={ !!activeRegion.current }
      onClose={ () => activeRegion.set(null) }
      slotProps={{
        backdrop: { sx: {
          bgcolor: 'transparent',
          backdropFilter: 'none',
        }, },
        content: { sx: {
          overflow: 'unset',
          bgcolor: 'transparent',
          mx: 2,
          py: 11,
          boxShadow: 'none',
          width: `${width}px`,
          minWidth: '250px',
          maxWidth: '700px',
          '.MuiSheet-root': {
            borderRight: '4px solid var(--joy-palette-neutral-800)',
          },
          '.resizable:hover .MuiSheet-root': {
            borderRight: '6px solid var(--joy-palette-neutral-700)',
          },
        }, },
      }}
    >
      <Resizable
        className="resizable"
        size={{ width: width, height: '100%' }}
        minWidth={ 250 }
        maxWidth={ 700 }
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width)
        }}
        enable={{
          topLeft: false,    top: false,    topRight: false,
          left: false,                      right: true,
          bottomLeft: false, bottom: false, bottomRight: false,
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
      </Resizable>
    </Drawer>
  )
}
