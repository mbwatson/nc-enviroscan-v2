import PropTypes from 'prop-types'
import { Layer, Source } from 'react-map-gl'

export const PointLayer = ({ data = [], source, paint }) => {
  const layerProperties = {
    id: `${ source }-point`,
    source: source,
    type: 'circle',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-radius': 4,
      'circle-stroke-width': 1,
      ...paint,
    }
  }

  return (
    <Source
      type="geojson"
      id={ source }
      data={ data }
    >
      <Layer { ...layerProperties } />
    </Source>
  )
}

PointLayer.propTypes = {
  paint: PropTypes.object,
  data: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
}
