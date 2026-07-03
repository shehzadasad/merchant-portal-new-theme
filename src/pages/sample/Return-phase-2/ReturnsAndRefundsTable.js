import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'
import React from 'react'

const ReturnsAndRefundsTable = () => {
  return (
    <div>
      <Typography fontSize={'20px'} fontWeight='500'>
        Refunds and Returns
      </Typography>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
        <Grid
          container
          style={{
            padding: 12,
            paddingLeft: 15,
            paddingRight: 0,
            paddingTop: 25,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid item>
            <Typography
              variant='p'
              component='p'
              fontWeight={500}
              fontSize={18}
            >
              iqra
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              width: 200,
              marginRight: 10,
            }}
          ></Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {/* ))} */}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default ReturnsAndRefundsTable
