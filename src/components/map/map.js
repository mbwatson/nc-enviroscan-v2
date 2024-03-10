import { createElement, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/joy'
import Map, { Layer, Popup, Source } from 'react-map-gl'
import { useAppContext, useMap } from '@context'
import * as turf from '@turf/turf'

import { censusTractsFillLayer } from './layers/boundaries/census-tracts-layer'
import { countiesFillLayer } from './layers/boundaries/counties-layer'

const interactiveLayerIds = [
  censusTractsFillLayer.id,
  countiesFillLayer.id,
]

export const Mapper = ({ height, width, ...props }) => {
  const { notify, setLoading, preferences } = useAppContext()
  const {
    activeRegion, engagedFeature, boundary, fitBounds,
    mapRef, layers, popup, viewState,
  } = useMap()
  const [cursor, setCursor] = useState('auto')

  useEffect(() => {
    if (!mapRef.current) {
      return
    }
    mapRef.current.on('movestart', function() { setLoading(true) })
    mapRef.current.on('moveend', function() { setLoading(false) })
  }, [mapRef.current])

  useEffect(() => {
    if (!activeRegion.current || !mapRef.current) {
      return
    }
    let region = activeRegion.current
    if (preferences.shouldZoomToRegion.disabled) {
      return
    }
    // consider putting this kind of thing in map-context
    if (!['Polygon', 'MultiPolygon'].includes(region.geometry.type)) {
      notify(`UNABLE_TO_ZOOM_TO_REGION ${ region.geometry.type }`, 'error')
      console.error(`UNABLE_TO_ZOOM_TO_REGION ${ region.geometry.type }`)
      return
    }
    const bbox = turf.bbox(region)
    const width = bbox[2] - bbox[0]
    const marginX = 0.1 * width
    const height = bbox[3] - bbox[1]
    const marginY = 0.15 * height
    bbox[0] = bbox[0] - marginX
    bbox[2] = bbox[2] + marginX
    bbox[1] = bbox[1] - marginY
    bbox[3] = bbox[3] + marginY
    bbox[0] = 2*bbox[0] - bbox[2]
    fitBounds(bbox)
  }, [activeRegion.current, preferences.shouldZoomToRegion.enabled])


  // check if a feature in our boundary layer is hovered
  // and, if so, set it as our active feature layer.
  const handleHoverMap = event => {
    // are we hovering a feature?
    const feature = event?.features?.[0]
    // if no feature layer was clicked,
    // reflect this in state, and bail out now.
    if (!feature) {
      engagedFeature.set(null)
      return
    }
    // we have a feature. stick it in state.
    engagedFeature.set(feature)
  }

  // check if a feature in our boundary layer is clicked
  // and, if so, set it as our active feature layer.
  const handleClickMap = event => {
    // are we hovering a feature?
    const feature = event?.features?.[0]
    // if no feature layer was clicked,
    // reflect this in state, and bail out now.
    if (!feature) {
      activeRegion.set(null)
      return
    }
    // we have a feature. what was it?
    // it must be the same as the hovered
    // one, `activeRegion.current`.
    activeRegion.set(feature)
  }

  const BoundaryLayer = useCallback(() => boundary.current
    ? createElement(boundary.available[boundary.current].Component)
    : null, [boundary.current])

  const engagedFeatureStyle = useMemo(() => ({
    type: 'line',
    paint: {
      'line-width': 5,
      'line-color': preferences.mapStyle.boundaryColor.current,
    }
  }), [engagedFeature.current])

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  return (
    <Map
      style={{ width, height }}
      ref={ mapRef }
      reuseMaps
      skipOnMount
      mapLib={ import('mapbox-gl') }
      { ...viewState.current }
      onMove={ event => viewState.set(event.viewState) }
      onMouseMove={ handleHoverMap }
      onClick={ handleClickMap }
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      cursor={ cursor }
      interactiveLayerIds={ interactiveLayerIds }
      mapStyle={ `mapbox://styles/mapbox/${ preferences.mapStyle.baseMap }` }
      { ...props }
      source="mapbox://mvvatson.clkpnbbi50bu62dp5dxh26pee-5d8sq"
      mapboxAccessToken={ process.env.MAPBOX_TOKEN }
    >
      <BoundaryLayer />
      {
        layers.active.map(layerId => {
          const { Component } = layers.available[layerId]
          return <Component key={ layerId } />
        })
      }
      {
        engagedFeature.current && (
          <Source id="active-feature" type="geojson" data={ engagedFeature.current }>
            <Layer { ...engagedFeatureStyle } />
          </Source>
        )
      }
      {
        popup.info && (
          <Box
            component={ Popup }
            key={ popup.info.latitude }
            longitude={ popup.info.longitude }
            latitude={ popup.info.latitude }
            anchor="bottom"
            onClose={ popup.close }
            offset={ [0, -25] }
            sx={{
              pointerEvents: 'none',
              border: '2px dashed black',
              '.mapboxgl-popup-tip': {
                border: '2px dashed black',
                backgroundColor: 'background.surface',
            },
              '.mapboxgl-popup-content': {
                border: '2px dashed black',
                backgroundColor: 'background.surface',
                borderRadius: 6,
                height: '400px',
              },
            }}
          >{ popup.info.region } County</Box>
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
