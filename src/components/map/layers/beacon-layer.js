import { memo } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

export const Beacon = memo(function Beacon({ color = '#ff0000' }) {
  return (
    <svg height={ 48 } width={ 48 } viewBox="0 0 48 48">
      <circle
        cx="24" cy="27" r="2"
        fill={ color } stroke={ color } strokeWidth="1"
      >
        <animate
          attributeName="r" begin="0s" dur="1s"
          keyTimes="0;1" values="2;22" repeatCount="indefinite"
        />
        <animate
          attributeName="opacity" begin="0s" dur="1s"
          from="100%" to="0%" repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity" begin="0s" dur="1s"
          from="100%" to="0%" repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
})

Beacon.propTypes = {
  color: PropTypes.string,
}

export const BeaconLayer = ({ longitude, latitude, color }) => {
  return (
    <Marker
      longitude={ longitude }
      latitude={ latitude }
      anchor="center"
    ><Beacon color={ color } /></Marker>
  )
}

BeaconLayer.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  color: PropTypes.string,
}

