import AppCard from '@crema/core/AppCard'
import { Box } from '@mui/material'
import React from 'react'
import OrderGraphs from './OrderGraphs.js'

function Graphs() {
  return (
    <AppCard
      sxStyle={{
        height: 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Box
            component='p'
            sx={{
              color: '#000',
              fontSize: 16,

              mb: { xs: 4, md: 6 },
            }}
          >
            Order Count By Day
          </Box>
          <Box
            component='h3'
            sx={{
              color: '#000',
              fontSize: 20,
            }}
          >
            $3400
          </Box>
        </Box>
        <Box
          sx={{
            pl: -10,
            mr: -8,
            mb: -10,
          }}
        >
          <OrderGraphs text='Dummy Text' />
        </Box>
      </Box>
    </AppCard>
  )
}

export default Graphs
