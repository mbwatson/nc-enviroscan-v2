import { Fragment, useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import { useData, useMap } from '@context'

export const pointLayer = {
  id: 'hospital-point',
  type: 'circle',
  source: 'hospitals',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#dc50ba',
    'circle-radius': 4,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#bc307a'
  }
}

export const HospitalsLayer = () => {
  const { hospitals } = useData()

	return (
    <Source
      type="geojson"
      data={ hospitals }
    >
      <Layer { ...pointLayer } />
    </Source>
  )
}
