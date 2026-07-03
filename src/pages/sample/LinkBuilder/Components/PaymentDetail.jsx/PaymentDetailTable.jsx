import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useSelector } from 'react-redux'
const PaymentDetailTable = ({ rows }) => {
  const columns = [
    { id: 'title', label: ' Items', minWidth: 100 },
    {
      id: 'variants',
      label: 'Variant',
      width: 100,
    },
    {
      id: 'no_of_orders',
      label: 'No. of Orders',
      minWidth: 60,
      align: 'center',
    },
    {
      id: 'price',
      label: 'Total Price',
      minWidth: 60,
      align: 'center',
    },
  ]
  const userDetail = useSelector((state) => state.users.userDetail)
  return (
    <React.Fragment>
      <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
        <Grid
          container
          style={{ padding: 12, paddingLeft: 15, paddingRight: 0 }}
          alignItems='center'
        >
          <Grid item xs={8} md={8} lg={8}>
            <Typography
              variant='p'
              component='p'
              fontWeight={600}
              fontSize={14}
            >
              Invoice Item
            </Typography>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Typography variant={'p'} component={'p'}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => {
                return (
                  <>
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns?.map((column) => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'title' ? (
                              <Typography
                                variant={'p'}
                                component={'p'}
                                // color='#ED2079'
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <img
                                  src={row.src}
                                  style={{
                                    marginRight: '12px',
                                    width: '30px',
                                    height: '30px',
                                  }}
                                />
                                {value}
                              </Typography>
                            ) : column.id === 'no_of_orders' ? (
                              <Typography variant={'p'} component={'p'}>
                                {value}
                              </Typography>
                            ) : column.id === 'variants' ? (
                              <Typography variant={'p'} component={'p'}>
                                {value} {value ? 'variant(s)' : ''}
                              </Typography>
                            ) : column.id === 'price' ? (
                              <Typography variant={'p'} component={'p'}>
                                {userDetail?.iso2 === 'PK' &&
                                  Number(value).toLocaleString('ur-PK', {
                                    style: 'currency',
                                    currency: 'PKR',
                                  })}
                                {userDetail?.iso2 === 'PH' &&
                                  Number(value).toLocaleString('fil-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                  })}

                                {userDetail?.iso2 !== 'PK' &&
                                userDetail?.iso2 !== 'PH'
                                  ? Number(value).toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                    })
                                  : ''}
                              </Typography>
                            ) : (
                              ''
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </React.Fragment>
  )
}

export default PaymentDetailTable
