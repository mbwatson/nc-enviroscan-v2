import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionGroup,
  Box,
} from '@mui/joy'
import { useMap } from '@context'

const RawData = ({ data }) => {
  return (
    <Box
      component="pre"
      sx={{
        fontSize: '75%',
        color: 'palette.text.primary'
      }}
    >
      { JSON.stringify(data, null, 2) }
    </Box>
  )
}

RawData.propTypes = {
  data: PropTypes.object,
}

export const RegionMetadata = () => {
  const { activeRegion } = useMap()
  
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
      <Accordion
        key="region-metdata"
        variant="soft"
      >
        <AccordionSummary>Region Metadata</AccordionSummary>
        <AccordionDetails>
          <RawData data={ activeRegion?.current?.properties ?? {} } />
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  )
}
