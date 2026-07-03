import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import React from 'react'

import AppLinearProgress from '@crema/core/AppLinearProgress'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import AccordionDetails from '@mui/material/AccordionDetails'
import PropTypes from 'prop-types'
import { Fonts } from '../../../../shared/constants/AppEnums'
import DashboardAppCard from '../Statistics/DashboardAppCard'

const TicketsSupport = ({ tickets }) => {
  const [expanded, setExpanded] = React.useState(1)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <DashboardAppCard
      sxStyle={{
        mb: { xs: 5, md: 8 },
        maxHeight: 425,
        minHeight: 425,
        overflow: 'scroll',
      }}
      contentStyle={{ padding: 0 }}
      footer={
        <Box
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <WatchLaterIcon style={{ fontSize: 16 }} />
          <Box
            component='span'
            sx={{
              ml: 2,
            }}
          >
            Last update 30 min ago
          </Box>
        </Box>
      }
    >
      {tickets.map((data) => (
        <Accordion
          sx={{
            position: 'relative',
            boxShadow: 'none',
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
            mb: '-1px',
            '&:last-of-type': {
              borderRadius: 0,
            },
          }}
          key={data.id}
          expanded={expanded === data.id}
          onChange={handleChange(data.id)}
        >
          <AccordionSummary
            sx={{
              padding: '0 24px',
              '& .MuiSvgIcon-root': {
                color: (theme) => theme.palette.grey[500],
              },
              '&.Mui-expanded': {
                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              },
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Box
                component='h3'
                sx={{
                  color: '#111827',
                  fontWeight: 500,
                  fontSize: expanded === data.id ? 21 : 16,
                }}
              >
                {data.name}
              </Box>
              <Box
                sx={{
                  ml: 'auto',
                  color: 'text.secondary',
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                {data.opened} Open
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: '5px 24px',
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    mb: 1,
                  }}
                >
                  Open
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <AppLinearProgress
                      value={data.overAllPercentage.open}
                      activeColor='#5ABE20'
                    />
                  </Box>
                  <Box
                    sx={{
                      ml: 4,
                      color: 'text.secondary',
                    }}
                    component='span'
                  >
                    {data.overAllPercentage.open}%
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    mb: 1,
                  }}
                >
                  Closed
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <AppLinearProgress
                      value={data.overAllPercentage.close}
                      activeColor='#F44D54'
                    />
                  </Box>
                  <Box
                    sx={{
                      ml: 4,
                      color: 'text.secondary',
                    }}
                    component='span'
                  >
                    {data.overAllPercentage.close}%
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    mb: 1,
                  }}
                >
                  On Hold
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <AppLinearProgress
                      value={data.overAllPercentage.hold}
                      activeColor='#F59821'
                    />
                  </Box>
                  <Box
                    sx={{
                      ml: 4,
                      color: 'text.secondary',
                    }}
                    component='span'
                  >
                    {data.overAllPercentage.hold}%
                  </Box>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </DashboardAppCard>
  )
}

export default TicketsSupport

TicketsSupport.propTypes = {
  tickets: PropTypes.array,
}
