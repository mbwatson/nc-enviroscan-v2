import { Fragment } from 'react'
import { FullscreenPage } from '@components/layout'
import { Mapper, ControlPanel, ViewStatePanel } from '@components/map'
import { useAppContext } from '@context'

export const MapView = () => {
  const { windowSize } = useAppContext()

  return (
    <FullscreenPage>
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
