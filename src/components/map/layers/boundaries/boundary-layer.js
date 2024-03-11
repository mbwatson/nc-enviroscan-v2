import PropTypes from 'prop-types'
import { Layer, Source } from 'react-map-gl'

import boundaryLayerData from '@data'

export const fillLayer = {
  id: 'boundary-fill',
  type: 'fill',
  paint: {
    'fill-color': '#fff',
    'fill-opacity': 0,
  }
};

const lineLayer = {
  id: 'boundary-outline',
  type: 'line',
  paint: {
    'line-width': 1,
    'line-color': '#0080ef',
  }
}

export const BoundaryLayer = ({ sourceId }) => {
  if (!sourceId) {
    return <Source id="blank" type="geojson" data={{}} />
  }

  return (
    <Source
      id={ sourceId }
      type="geojson"
      data={ boundaryLayerData[sourceId] }
    >
      <Layer { ...lineLayer } />
      <Layer { ...fillLayer } />
    </Source>
  )
}

BoundaryLayer.propTypes = {
  sourceId: PropTypes.oneOf(Object.keys(boundaryLayerData))
}

export const boundaryLayers = {
  'census-tracts': {
    id: 'census-tracts',
    name: 'Census Tracts',
    nameSingular: 'Census Tract',
    accessor: {
      name: 'properties.NAMELSAD',
    }
  },
  'congressional-districts': {
    id: 'congressional-districts',
    name: 'Congressional Districts',
    nameSingular: 'Congressional District',
    accessor: {
      name: 'properties.district',
    }
  },
  'counties': {
    id: 'counties',
    name: 'Counties',
    nameSingular: 'County',
    accessor: {
      name: 'properties.CountyName',
    }
  },
  'zipcodes': {
    id: 'zipcodes',
    name: 'ZIP Codes',
    nameSingular: 'ZIP Code',
    accessor: {
      name: 'properties.ZCTA5CE10',
    }
  },
}