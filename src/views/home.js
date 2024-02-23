import { Divider, Grid } from '@mui/joy'
import { ContentPage } from '@components/layout'
import { useAppContext } from '@context'
import { DashboardCard } from '@components/dashboard-card'

const SamplesSummary = () => {
  const { data } = useAppContext()
  const counts = data.data.reduce((acc, d) => {
    if (d.study.dataset in acc) {
      acc[d.study.dataset] += 1
      return acc
    }
    acc[d.study.dataset] = 1
    return acc
  }, {})
  
  return (
    <DashboardCard title="Samples">
      <pre>{
        JSON.stringify({ total: data.data.length }, null, 2)
      }</pre>
      <Divider />
      <pre>{
        JSON.stringify(counts, null, 2)
      }</pre>
    </DashboardCard>
  )
}

const SamplesByMedium = () => {
  const { data } = useAppContext()
  const counts = data.data.reduce((acc, d) => {
    if (d.study.medium in acc) {
      acc[d.study.medium] += d.study.sampleCount
      return acc
    }
    acc[d.study.medium] = d.study.sampleCount
    return acc
  }, {})
  
  return (
    <DashboardCard title="Samples by Medium">
      <pre>{
        JSON.stringify(counts, null, 2)
      }</pre>
    </DashboardCard>
  )
}

const SamplesByLocation = () => {
  const { data } = useAppContext()
  const counts = data.data.reduce((acc, d) => {
    const locationKey = `${ d.location.city }, ${ d.location.state }`
    if (locationKey in acc) {
      acc[locationKey] += 1
      return acc
    }
    acc[locationKey] = 1
    return acc
  }, {})
  const orderedLocations = Object.keys(counts)
    .sort((l, m) => counts[l] < counts[m] ? 1 : -1)
    .map(l => `${l}: ${ counts[l] }`)
  
  return (
    <DashboardCard title="Sampled Locations">
      <pre>
        {
          orderedLocations.map(l => (
            <div key={ l }>{ l }: { counts[l] }</div>
          ))
        }
      </pre>
    </DashboardCard>
  )
}

export const HomeView = () => {
  return (
    <ContentPage>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={ 12 } sm={ 4 }>
          <SamplesSummary />
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <SamplesByMedium />
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <DashboardCard title="...">
            ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <SamplesByLocation />
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <DashboardCard title="...">
            ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <DashboardCard title="...">
            ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <DashboardCard title="...">
            ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <DashboardCard title="...">
            ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 4 }>
          <DashboardCard title="...">
            ...
          </DashboardCard>
        </Grid>
      </Grid>
    </ContentPage>
  )
}