import AppLinearProgress from '@crema/core/AppLinearProgress'
import { Box, darken } from '@mui/material'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { useIntl } from 'react-intl'
import { Fonts } from '../../../../shared/constants/AppEnums'
import DashboardAppCard from '../Statistics/DashboardAppCard'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    backgroundColor: theme.palette.background.default,
  },
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiLinearProgress-root': {
      backgroundColor: darken('#E72E80', 0.1),
    },
    '&.Mui-expanded': {
      backgroundColor: theme.palette.background.default,
    },
  })
)

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const TrafficSource = ({ trafficData }) => {
  const [expanded, setExpanded] = React.useState(0)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const { messages } = useIntl()
  return (
    <DashboardAppCard
      isInfo={false}
      title={messages['dashboard.analytics.trafficSource']}
    >
      {trafficData.map((data) => (
        <Accordion
          key={data.id}
          expanded={expanded === data.id}
          onChange={handleChange(data.id)}
        >
          <AccordionSummary
            expanded={expanded === data.id ? 'selected' : ''}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'space-between',
                }}
              >
                <Box>{data.title}</Box>
                <Box
                  component='span'
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {data.value}%
                </Box>
              </Box>
              <AppLinearProgress
                value={data.value}
                thickness={10}
                activeColor='#E72E80'
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Box
                component='span'
                sx={{
                  ml: 2,
                  fontWeight: Fonts.LIGHT,
                }}
              >
                {data.session}
              </Box>
              <Box
                component='span'
                sx={{
                  ml: 2,
                  color: 'text.secondary',
                }}
              >
                Session
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </DashboardAppCard>
  )
}

export default TrafficSource

TrafficSource.propTypes = {
  trafficData: PropTypes.array,
}
