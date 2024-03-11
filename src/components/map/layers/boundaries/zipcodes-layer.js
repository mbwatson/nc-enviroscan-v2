import { Layer, Source } from 'react-map-gl'
import zipcodes from '@data/nc-zipcodes.geojson'

export const zipcodesFillLayer = {
  id: 'zipcodes-fill',
  source: 'zipcodes',
  type: 'fill',
  paint: {
    'fill-color': '#fff',
    'fill-opacity': 0,
  }
};

const zipcodesLineLayer = {
  id: 'zipcodes-outline',
  source: 'zipcodes',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': '#0080ef',
  }
}

export const id = 'zipcodes'

export const name = 'ZIP Codes'

export const Component = () => {
  return (
    <Source
      id={ id }
      type="geojson"
      data={ zipcodes }
    >
      <Layer { ...zipcodesLineLayer } />
      <Layer { ...zipcodesFillLayer } />
    </Source>
  )
}

export const accessor = {
  name: 'properties.ZCTA5CE10',
}

