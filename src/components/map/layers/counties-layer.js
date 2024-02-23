import { Layer, Source } from 'react-map-gl'
import counties from '@content/us-counties.geojson'

export const countiesFillLayer = {
  id: 'counties-fill',
  source: 'counties',
  type: 'fill',
  paint: {
    'fill-outline-color': '#0040c8',
    'fill-color': '#fff',
    'fill-opacity': 0,
  }
};

const countiesLineLayer = {
  id: 'counties-outline',
  source: 'counties',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': '#0080ef',
  }
}

export const CountiesLayer = () => {
  return (
    <Source
      id="counties"
      type="geojson"
      data={ counties }
    >
      <Layer { ...countiesLineLayer } />
      <Layer { ...countiesFillLayer } />
    </Source>
  )
}
