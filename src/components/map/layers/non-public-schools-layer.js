import { Fragment, useMemo } from 'react'
import { Source, Layer } from 'react-map-gl'
import { useData } from '@context'

export const pointLayer = {
  id: 'non-public-school-point',
  type: 'circle',
  source: 'non-public-schools',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#dc9a20',
    'circle-radius': 4,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#bc7a00'
  }
}

export const NonPublicSchoolsLayer = () => {
  const { nonPublicSchools } = useData()

	return (
    <Source
      type="geojson"
      data={ nonPublicSchools }
    >
      <Layer { ...pointLayer } />
    </Source>
  )
}
