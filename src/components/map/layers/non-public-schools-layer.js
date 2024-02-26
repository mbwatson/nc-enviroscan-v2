import { useData } from '@context'
import { PointLayer } from './'


export const NonPublicSchoolsLayer = () => {
  const { nonPublicSchools } = useData()

  return (
    <PointLayer
      source="non-public-schools"
      data={ nonPublicSchools || {} }
      paint={{
        'circle-color': '#bc7a00',
        'circle-stroke-color': '#9c4a00',
      }}
    />
  )
}
