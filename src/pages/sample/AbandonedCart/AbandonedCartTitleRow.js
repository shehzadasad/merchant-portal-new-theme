import React from 'react'
import SharedSearchBox from 'shared/components/SharedSearchBox'
import { Grid, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'

const AbandonedCartTitleRow = () => {
  const isMdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: isMdDown ? 'grid' : 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Typography
          variant='h1'
          component='h2'
          marginBottom={isMdDown ? '10px' : '0'}
        >
          Abandoned Cart
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid
            item
            style={{
              marginRight: 10,
            }}
          >
            <SharedSearchBox
              width={window.innerWidth > 600 ? 290 : '100%'}
              onClick={(e) => {
                // dispatch(searchOrders(userDetails.id, e.target.value))
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // dispatch(searchOrders(userDetails.id, e.target.value))
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AbandonedCartTitleRow
