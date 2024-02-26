import { useData } from '@context'
import { PointLayer } from './'


export const HospitalsLayer = () => {
  const { hospitals } = useData()

	return (
    <PointLayer
      source="hospitals"
      data={ hospitals }
      paint={{
        'circle-color': '#f16',
        'circle-stroke-color': '#c04',
      }}
    />
  )
}
