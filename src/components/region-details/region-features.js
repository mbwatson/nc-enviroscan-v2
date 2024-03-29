import { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  List,
  ListItem,
} from '@mui/joy'
import * as turf from '@turf/turf'
import { useData, useMap } from '@context'
import { deepValue } from '@util'

// these are features from the visible feature layers (points)
// that lie within the active region (polygon)
export const ContainedFeaturesList = ({ features, source }) => {
  const { layers } = useMap()
  const { accessor } = layers.available[source]

  // list the features sorted display names
  // those no need to handle the case of having no
  // features, an empty array, because we disable
  // the accordion in which this gets rendered.
  return (
    <List
      marker="disc"
      sx={{
        pt: 1, pb: 0,
        maxHeight: '250px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '.MuiListItem-root': {
          py: 0,
        },
      }}
    >
      {
        features
          .map(feature => [deepValue(feature, accessor.name), feature])
          .sort(([fName], [gName]) => fName < gName ? -1 : 1)
          .map(([, feature], i) => (
            <ListItem key={ `${ i }-${ feature.id }` }>
              { deepValue(feature, accessor.name) }
            </ListItem>
          ))
      }
    </List>
  )
}

ContainedFeaturesList.propTypes = {
  features: PropTypes.array,
  source: PropTypes.string,
  title: PropTypes.string,
}

export const RegionFeatures = () => {
  const { layerData } = useData()
  const { activeRegion, layers } = useMap()
  
  const regionPolygon = useMemo(() => {
    if (!activeRegion.current) {
      return []
    }
    return activeRegion.current.geometry.coordinates
  }, [activeRegion.current])

  if (!activeRegion.current) {
    return <div>none selected</div>
  }

  return (
    <AccordionGroup
      sx={{
        '.MuiAccordionSummary-root': {
          pl: 2,
        },
        '.MuiAccordionDetails-root': {
          backgroundColor: 'background.surface',
        },
        '.MuiAccordionDetails-content': {
          pb: 0, pr: 0,
        },
      }}
    >
      {
        // find the intersection of the active feature
        // layers and the fill layer associated with the
        // active/hovered boundary region.
        layers.active
          .sort((a, b) => a < b ? -1 : 1)
          .map(id => {
            const layerCoordinates = layerData[id].data.features
              .map(feature => feature.geometry.coordinates)
            const containedFeatures = turf
              .pointsWithinPolygon(
                turf.points(layerCoordinates),
                turf.polygon(regionPolygon),
              ).features.map(feature =>
                feature.geometry.coordinates
              ).map(coords => {
                const matchingFeature = layerData[id].data.features
                  .find(feature => {
                    return JSON.stringify(feature.geometry.coordinates) === JSON.stringify(coords)
                  })
                if (!matchingFeature) {
                  return { }
                }
                return matchingFeature
              })

            return (
              <Accordion
                key={ `contained-${ id }-details` }
                variant="soft"
                disabled={ !containedFeatures.length }
              >
                <AccordionSummary>
                  { layers.available[id].name } ({ containedFeatures.length })
                </AccordionSummary>
                <AccordionDetails>
                  <ContainedFeaturesList
                    source={ id }
                    features={ containedFeatures }
                  />
                </AccordionDetails>
              </Accordion>
            )
          })
      }
    </AccordionGroup>
  )
}
