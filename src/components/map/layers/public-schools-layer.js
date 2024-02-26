import { useData } from '@context'
import { PointLayer } from './'


export const PublicSchoolsLayer = () => {
  const { publicSchools } = useData()

  return (
    <PointLayer
      source="public-schools"
      data={ publicSchools }
      paint={{
        'circle-color': '#007abc',
        'circle-stroke-color': '#003a8c',
      }}
    />
  )
}
