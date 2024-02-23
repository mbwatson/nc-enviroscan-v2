import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Map from 'react-map-gl'
import { useAppContext, useMap } from '@context'
import {
  clusterLayer,
  unclusteredPointLayer,
  countiesFillLayer,
  congressionalFillLayer,
} from './layers'

const interactiveLayerIds = [
  clusterLayer.id,
  unclusteredPointLayer.id,
  countiesFillLayer.id,
  congressionalFillLayer.id,
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
    // console.log(feature)

    // so we have a feature layer.
    // we may want different behavior whether
    // the user clicks a cluster or a single point.

    // if we have a cluster...
    if (feature.layer.id === clusterLayer.id) {
      // with the source data...
      const clusterSource = mapRef.current.getSource('samples')
      // ...and the id of the clicked-on cluster,
      const { cluster_id } = feature.properties
      // we'll identify the samples that comprise it.
      clusterSource.getClusterLeaves(cluster_id, 100, 0, function(error, aFeatures){
        const samples = aFeatures.map(f => f.properties.id)
        popup.set({
          lat: feature.geometry.coordinates[1],
          long: feature.geometry.coordinates[0],
          title: `${ aFeatures.length } SAMPLES`,
          data: samples,
        })
      })
      return
    }

    // we have a single point.
    if (feature.layer.id === unclusteredPointLayer.id) {
      popup.set({
        lat: feature.geometry.coordinates[1],
        long: feature.geometry.coordinates[0],
        title: 'SAMPLE',
        data: feature.properties.id,
      })
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
          const Component = layers.available[layerId]
          return <Component key={ layerId } />
        })
      }
    </Map>
  )
}

Mapper.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
}
