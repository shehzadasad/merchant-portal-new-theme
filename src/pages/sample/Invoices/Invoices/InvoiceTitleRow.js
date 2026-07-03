import React from 'react'
import { Grid, Typography } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import SharedSearchBox from 'shared/components/SharedSearchBox'

const InvoiceTitleRow = (props) => {
  return (
    <Grid
      container
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
      }}
    >
      <Grid item>
        <Typography variant='h1' component='h2'>
          Invoices
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Grid item style={{ marginRight: 10 }}>
            <SharedSearchBox
              width={window.innerWidth > 600 ? 290 : '100%'}
              onChange={(e) => {
                props.setSearchParams(e.target.value)
              }}
              onKeyDown={props.handleKeypress}
              value={props.searchParams}
            />
          </Grid>
          <Grid item>
            <SharedButton
              text='+ Create New Invoice'
              style={{
                background: '#e93a7d',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: 200,
                border: 'none',
                height: 40,
                cursor: 'pointer',
              }}
              onClick={props.OnCreateInvoice}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InvoiceTitleRow
