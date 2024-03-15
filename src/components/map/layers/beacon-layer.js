import { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

export const Beacon = memo(function beaconSvg() {
  return (
    <svg
      height={ 48 }
      width={ 48 }
      viewBox="0 0 48 48"
      style={{
        fill: '#ff000022',
        stroke: 'none',
        zIndex: 9999,
      }}
    >
      <circle
        cx="24" cy="27" r="2"
        fill="#ff0000"
        stroke="#ff0000"
        strokeWidth="1"
      >
        <animate
          attributeName="r" 
          begin="0s"
          values="2;22"
          keyTimes="0;1"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1s"
          repeatCount="indefinite"
          from="100%"
          to="0%"
        />
        <animate
          attributeName="fill-opacity"
          begin="0s"
          dur="1s"
          repeatCount="indefinite"
          from="100%"
          to="0%"
        />
      </circle>
    </svg>
  )
})

export const BeaconLayer = ({ longitude, latitude }) => {

  return (
    <Marker
      longitude={ longitude }
      latitude={ latitude }
      anchor="center"
    ><Beacon /></Marker>
  )
}

BeaconLayer.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
}

