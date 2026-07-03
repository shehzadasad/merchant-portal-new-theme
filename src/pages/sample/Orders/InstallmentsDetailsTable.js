import { Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import currencyFormatter from 'currency-formatter'
import moment from 'moment'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#ED2079' : '#ED2079',
  },
  width: '55%',
}))

const InstallmentsDetailsTable = (props) => {
  const { rows, columns } = props

  return (
    <Paper sx={{ width: '100%', marginTop: '35px', borderRadius: '10px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: 'white',
                  }}
                >
                  <Typography variant={'p'} component={'p'}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.merchant_installment_plans?.map((row) => {
              return (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={row.customer}
                >
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'installement_number' ? (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            {row.installment_number}/4
                            <BorderLinearProgress
                              variant='determinate'
                              value={
                                row.installment_number === 1
                                  ? 25
                                  : row.installment_number === 2
                                  ? 50
                                  : row.installment_number === 3
                                  ? 75
                                  : row.installment_number === 4
                                  ? 100
                                  : 0
                              }
                              style={{ marginLeft: '10px' }}
                            />
                          </Typography>
                        ) : column.id === 'installement_amount' ? (
                          <Typography variant={'p'} component={'p'}>
                            {localStorage.getItem('userCountryId') === '236'
                              ? currencyFormatter.format(row.amount, {
                                  code: 'USD',
                                })
                              : currencyFormatter.format(row.amount, {
                                  code: 'PKR',
                                })}
                          </Typography>
                        ) : column.id === 'installement_date' ? (
                          <Typography variant={'p'} component={'p'}>
                            {moment(row.installment_due_at).format('LLLL')}
                            {/* 08 Apr 2022 11:52:27 am */}
                          </Typography>
                        ) : column.id === 'payout_id' ? (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            style={{ color: '#ED2079' }}
                          >
                            {row.payout_Id ?? '-'}
                          </Typography>
                        ) : column.id === 'date_paid' ? (
                          <Typography variant={'p'} component={'p'}>
                            {/* 08 Apr 2022 11:52:27 am */}
                            {row.status === 'COMPLETED'
                              ? moment(row.paid_at).format('LLLL')
                              : '-'}
                          </Typography>
                        ) : (
                          ''
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default InstallmentsDetailsTable

InstallmentsDetailsTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  timeRange: PropTypes.bool,
}
