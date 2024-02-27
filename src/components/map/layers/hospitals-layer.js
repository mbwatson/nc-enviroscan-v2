import { useData } from '@context'
import { PointLayer } from './'


export const id = `hospitals`

export const name = 'Hospitals'

export const Component = () => {
  const { hospitals } = useData()

	return (
    <PointLayer
      source="hospitals"
      data={ hospitals }
      paint={{
        'circle-color': '#f16',
        'circle-stroke-color': '#c04',
        'circle-radius': 5,
      }}
    />
  )
}
