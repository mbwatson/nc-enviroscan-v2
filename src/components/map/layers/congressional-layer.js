import { Layer, Source } from 'react-map-gl'
import congressional from '@content/us-congressional.geojson'

export const congressionalFillLayer = {
  id: 'congressional-district-fill',
  source: 'congressional',
  type: 'fill',
  paint: {
    'fill-outline-color': '#a7007b',
    'fill-color': '#fff',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      0.1
    ],
  }
};

export const congressionalLineLayer = {
  id: 'congressional-district-outline',
  source: 'congressional',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': '#c700ab',
  }
}

export const CongressionalLayer = () => {
  return (
    <Source
      id="congressional"
      type="geojson"
      data={ congressional }
    >
      <Layer { ...congressionalFillLayer } />
      <Layer { ...congressionalLineLayer } />
    </Source>
  )
}
