import { Layer, Source } from 'react-map-gl'
import congressionalDistricts from '@data/nc-congressional-districts.geojson'

export const congressionalDistrictsFillLayer = {
  id: 'congressional-districts-fill',
  source: 'congressional-districts',
  type: 'fill',
  paint: {
    'fill-color': '#fff',
    'fill-opacity': 0,
  }
};

const congressionalDistrictsLineLayer = {
  id: 'congressional-districts-outline',
  source: 'congressional-districts',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': '#0080ef',
  }
}

export const id = 'congressional-districts'

export const name = 'Congressional Districts'

export const Component = () => {
  return (
    <Source
      id={ id }
      type="geojson"
      data={ congressionalDistricts }
    >
      <Layer { ...congressionalDistrictsLineLayer } />
      <Layer { ...congressionalDistrictsFillLayer } />
    </Source>
  )
}

export const accessor = {
  name: 'properties.district',
}
