import { Fragment, useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import { useData, useMap } from '@context'

export const pointLayer = {
  id: 'public-school-point',
  type: 'circle',
  source: 'public-schools',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#209adc',
    'circle-radius': 4,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#007abc'
  }
}

export const PublicSchoolsLayer = () => {
  const { publicSchools } = useData()

	return (
    <Source
      type="geojson"
      data={ publicSchools }
    >
      <Layer { ...pointLayer } />
    </Source>
  )
}
