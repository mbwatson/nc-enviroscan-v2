import { Fragment } from 'react'
import { FullscreenPage } from '@components/layout'
import { Mapper, ControlPanel, ViewStatePanel } from '@components/map'
import { useAppContext } from '@context'

export const MapView = () => {
  const { windowSize } = useAppContext()

  return (
    <FullscreenPage sx={{
      '.mapboxgl-popup': { 
        position: 'absolute',
        top: '10px',
        left: 0,
        willChange: 'transform',
        zIndex: 999,
        backgroundColor: 'transparent',
        minWidth: '300px',
        minHeight: '300px',
        overflow: 'hidden',
        'pre': {
          maxHeight: '200px',
          overflow: 'auto'
        }
      },
      '.mapboxgl-popup-tip': {
        width: '1rem',
        height: '1rem',
        margin: 'auto',
        borderWidth: 0,
        backgroundColor: 'background.surface',
        transform: 'rotate(45deg) translate(0.4rem, 0.4rem)',
      },
      '.mapboxgl-popup-content': {
        borderRadius: 5,
        p: 1,
        color: 'text.primary',
        backgroundColor: 'background.surface',
        'pre': {
          fontSize: '75%',
        },
      },
    }}>
      {
        !windowSize.height || !windowSize.width
        ? 'Loading...'
        : (
          <Fragment>
            <Mapper
              height={ windowSize.height }
              width={ windowSize.width }
            />
            <ViewStatePanel />
          </Fragment>
        )
      }
      <ControlPanel />
    </FullscreenPage>
  )
}
