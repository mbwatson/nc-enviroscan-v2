import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { LocationSearching as CenterMarker } from '@mui/icons-material'
import Map, { Layer, Marker, Source } from 'react-map-gl'
import { useAppContext, useMap } from '@context'
import * as turf from '@turf/turf'
import {
  BoundaryLayer,
  fillLayer as boundaryFillLayer,
} from './layers/boundary-layer'
import 'mapbox-gl/dist/mapbox-gl.css'

export const Mapper = ({ height, width, ...props }) => {
  const { notify, setLoading, preferences, windowSize } = useAppContext()
  const {
    activeRegion, engagedFeature, boundary, fitBounds,
    layers, mapRef, viewState,
  } = useMap()
  const interactiveLayerIds = [
    boundaryFillLayer.id,
  ]
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
    const lp = activeRegion.current ? Math.max((windowSize.width - 715) / 2, 0) + 100 : 100
    fitBounds(bbox, {
      padding: {
              top: 100,
        left: lp,   right: 100,
             bottom: 100,
      },
      duration: 1000,
    })
  }, [
    activeRegion.current,
    preferences.shouldZoomToRegion.enabled,
    windowSize.width,
  ])

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
    console.log(event)
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

  const engagedFeatureStyle = useMemo(() => ({
    type: 'line',
    paint: {
      'line-width': 5,
      'line-color': preferences.mapStyle.boundaryColor.current,
    }
  }), [engagedFeature.current])

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  const ActiveBoundaryLayer = useCallback(() => {
    return (
      <BoundaryLayer
        color={ preferences.mapStyle.boundaryColor.current }
        sourceId={ boundary.current }
      />
    )
  }, [boundary.current, preferences.mapStyle.boundaryColor.current])

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
      <ActiveBoundaryLayer />
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
      <Marker
        longitude={ viewState.current.longitude }
        latitude={ viewState.current.latitude }
        anchor="center"
      >
        <CenterMarker size="lg" />
      </Marker>
    </Map>
  )
}

Mapper.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
}

const PinSvgPath  = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const Pin = () => {
  return (
    <svg
      height={ 24 }
      width={ 24 }
      viewBox="0 0 24 24"
      style={{
        fill: '#dd00d0',
        stroke: 'none',
        zIndex: 9999,
      }}
    ><path d={ PinSvgPath } /></svg>
  )
}

export default memo(Pin)
