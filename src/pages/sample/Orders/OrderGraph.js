import { AppSelect } from '@crema'
import AppCard from '@crema/core/AppCard'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import React from 'react'
import StaticsGraph from './StaticsGraph'

const OrderGraph = ({ data }) => {
  return (
    <AppCard
      className='card-hover'
      sx={(theme) => ({
        [theme.breakpoints.down('lg')]: {
          marginTop: 3,
          minHeight: 170,
          paddingBottom: 20,
        },
        [theme.breakpoints.up('lg')]: {
          marginTop: 3,
          minHeight: 170,
          paddingBottom: 20,
        },
      })}
      style={{
        minHeight: 170,
        maxHeight: 170,
        marginRight: window.innerWidth > 600 ? 10 : 0,
        paddingBottom: 10,
        paddingTop: '10%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            flex: 1,
            pr: 3,
            marginBottom: 20,
          }}
        >
          <Box
            component='h3'
            sx={{
              mb: 0.5,
              fontSize: 20,
            }}
          >
            {data.value}
          </Box>
          <Box
            component='p'
            sx={{
              color: '#737989',
              marginTop: 2,
              marginBottom: 1,
            }}
          >
            {data.type}
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: 180,
          }}
        >
          <StaticsGraph
            id={data.id}
            graphData={data.graphData}
            growth={data.growth}
            strokeColor={data.strokeColor}
          />
        </Box>
      </Box>
    </AppCard>
  )
}

export default OrderGraph

OrderGraph.propTypes = {
  data: PropTypes.object,
}
