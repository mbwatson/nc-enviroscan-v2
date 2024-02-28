import { Layer, Source } from 'react-map-gl'
import censusTracts from '@content/nc-census-tracts.geojson'

export const censusTractsFillLayer = {
  id: 'census-tracts-fill',
  source: 'census-tracts',
  type: 'fill',
  paint: {
    'fill-outline-color': '#00c840',
    'fill-color': '#fff',
    'fill-opacity': 0,
  }
};

const censusTractsLineLayer = {
  id: 'census-tracts-outline',
  source: 'census-tracts',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': '#00ef80',
  }
}

export const id = 'census-tracts'

export const name = 'Census Tracts'

export const Component = () => {
  return (
    <Source
      id="census-tracts"
      type="geojson"
      data={ censusTracts }
    >
      <Layer { ...censusTractsLineLayer } />
      <Layer { ...censusTractsFillLayer } />
    </Source>
  )
}