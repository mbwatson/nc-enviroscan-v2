import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Map, { Popup } from 'react-map-gl'
import { useAppContext, useMap } from '@context'
import {
  countiesFillLayer,
} from './layers'

const interactiveLayerIds = [
  countiesFillLayer.id,
]

export const Mapper = ({ height, width, ...props }) => {
  const { setLoading, preferences } = useAppContext()
  const { mapRef, mapStyle, layers, popup, viewState } = useMap()

  useEffect(() => {
    if (!mapRef.current) {
      return
    }
    mapRef.current.on('movestart', function(){
      setLoading(true)
    })
    mapRef.current.on('moveend', function(){
      setLoading(false)
    })
  }, [mapRef.current])

  const onMouseMove = event => {
    const feature = event?.features?.[0]

    // if no feature layer was hovered, bail out now.
    if (!feature) {
      return
    }
    // console.log(feature)
  }

  const handleClickMap = event => {
    // get the feature of the click target
    const feature = event?.features?.[0]
    
    // if no feature layer was clicked, bail out now.
    if (!feature) {
      popup.close()
      return
    }
  }

  return (
    <Map
      style={{ width, height }}
      ref={ mapRef }
      reuseMaps
      skipOnMount
      mapLib={ import('mapbox-gl') }
      { ...viewState.current }
      onMove={ event => viewState.set(event.viewState) }
      onMouseMove={ onMouseMove }
      onClick={ handleClickMap }
      interactiveLayerIds={ interactiveLayerIds }
      mapStyle={ `mapbox://styles/mapbox/${ mapStyle.getBaseMap(preferences.colorMode.current) }` }
      { ...props }
      source="mapbox://mvvatson.clkpnbbi50bu62dp5dxh26pee-5d8sq"
      mapboxAccessToken={ process.env.MAPBOX_TOKEN }
    >
      {
        layers.active.map(layerId => {
          const { Component } = layers.available[layerId]
          return <Component key={ layerId } />
        })
      }
      {
        popup.info && (
          <Popup
            longitude={-100}
            latitude={40}
            anchor="bottom"
            onClose={ popup.close }
          >{ popup.info }</Popup>
        )
      }
    </Map>
  )
}

Mapper.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
}
