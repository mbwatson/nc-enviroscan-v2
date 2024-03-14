import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

export const BeaconLayer = ({ longitude, latitude }) => {
  const Beacon = useCallback(() => {
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
          fill="none"
          stroke="#ff0000"
          strokeWidth="2"
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
        </circle>
      </svg>
    )
  }, [])

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

