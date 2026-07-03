import { alpha, LinearProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import React from 'react'

const TableItem = ({ course }) => {
  return (
    <Box
      className='item-hover'
      key={course.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mr: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.12),
              borderRadius: 1,
              padding: 1.5,
            }}
          >
            <img alt='' src={course.icon} />
          </Box>

          <Box sx={{ width: '100%', marginTop: 4 }}>
            <LinearProgress
              variant='determinate'
              value={59}
              sx={{ width: '30vw' }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          ml: 'auto',
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: '#6B7280',
          }}
        >
          23%
        </Typography>
      </Box>
    </Box>
  )
}

export default TableItem

TableItem.propTypes = {
  course: PropTypes.object,
}
