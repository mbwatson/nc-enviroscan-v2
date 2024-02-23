import { Fragment, useEffect } from 'react'
import { Layer, Popup, Source } from 'react-map-gl'
import { useAppContext, useMap } from '@context'

export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'samples',
  filter: ['has', 'point_count'],
  paint: {
    // step expressions, https://docs.mapbox.com/style-spec/reference/expressions/#step
    'circle-radius': ['step', ['get', 'point_count'],
      /* radius */ 15, /* for point count up to */ 3,
      /* radius */ 20, /* for point count up to */ 9,
      /* and radius */ 35 /* for more than that. */
    ],
    'circle-color': [ 'step', ['get', 'point_count'],
      '#205555', 3,
      '#552055', 9,
      '#777740'
    ],
  },
}

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'samples',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['literal', ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']],
    'text-size': 16,
  },
  paint: {
    'text-color': '#fff',
  },
}

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'samples',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#66bc94',
    'circle-radius': 6,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#368c64'
  }
}

export const ClusterLayer = () => {
  const { data } = useAppContext()
  const { mapRef, popup } = useMap()

  const geojson = {
    type: 'FeatureCollection',
    features: data.data.map(sample => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [sample.location.long, sample.location.lat],
      },
      properties: { ...sample },
    })),
  }

  useEffect(() => {
    popup.close()
  }, [mapRef?.current?.getZoom() ?? 0]) // is this ok?

	return (
		<Fragment>
      <Source
        id="samples"
        type="geojson"
        data={ geojson }
        cluster={ true }
        clusterMaxZoom={ 14 }
        clusterRadius={ 50 }
      >
        <Layer { ...clusterLayer } />
        <Layer { ...clusterCountLayer } />
        <Layer { ...unclusteredPointLayer } />
      </Source>
      {
        !!popup.info && (
          <Popup
            anchor="top"
            tipSize={ 50 }
            longitude={ popup.info.long }
            latitude={ popup.info.lat }
            onClose={ popup.close }
          >
            <strong>{ popup.info.title }</strong>

            <pre>
              { JSON.stringify(popup.info.data, null, 2) }
            </pre>

            <br />
            
            <a href="/#/analysis">explore this</a>
          </Popup>
        )
      }
		</Fragment>
	)
}
