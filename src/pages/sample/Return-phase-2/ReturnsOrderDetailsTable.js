import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from 'assets/icon/EditIcon.svg'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterOrders } from 'redux/actions/OrderAction'

const RetrunsOrderDetailsTable = (props) => {
  const { refundItems, rows } = props
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const columns = [
    {
      id: 'id',
      label: 'id',
      minWidth: 80,
    },
    {
      id: 'name',
      label: 'Product',
      minWidth: 170,
      align: 'center',
      format: 'date',
    },
    {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'unit_price',
      label: 'Unit Price',
      minWidth: 80,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'amount',
      label: 'Total Price',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'brand',
      label: 'Brand',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'sku',
      label: 'SKU',
      minWidth: 80,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'return_reason',
      label: 'Return Reason',
      minWidth: 120,
      align: 'center',
    },
    {
      id: 'view-details',
      minWidth: 100,
      align: 'center',
      format: 'img',
    },
  ]
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const handleChangeTime = (value) => {
    let fromDateStr, toDateStr

    if (value === 'today') {
      fromDateStr = moment().format('YYYY-MM-DD')
      toDateStr = moment().format('YYYY-MM-DD')
    } else if (value === 'yesterday') {
      fromDateStr = moment().subtract(1, 'days').format('YYYY-MM-DD')
      toDateStr = moment().subtract(1, 'days').format('YYYY-MM-DD')
    } else if (value === 'last30Days') {
      fromDateStr = moment().format('YYYY-MM-DD')
      toDateStr = moment().subtract(30, 'days').format('YYYY-MM-DD')
    }

    const data = {
      startDate: toDateStr,
      endDate: fromDateStr,
    }

    dispatch(filterOrders(data, userDetail.id))
  }

  return (
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
        <Grid item xs={7} sm={6} md={7} lg={8}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Refunded Items
          </Typography>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {refundItems.map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {(column.format !== 'date' &&
                          column.id === 'orderid') ||
                        column.id === 'order_number' ||
                        (column.id === 'id' && column.id !== 'orderstatus') ? (
                          <Link to={props.detailsURL + `/${row['order_id']}`}>
                            <Typography
                              variant={'p'}
                              component={'p'}
                              color='#ED2079'
                            >
                              {value}
                            </Typography>
                          </Link>
                        ) : column.format &&
                          typeof value === 'number' &&
                          column.id !== 'orderstatus' ? (
                          column.format(value)
                        ) : column.format === 'date' ? (
                          <Typography variant={'p'} component={'p'}>
                            {value}
                          </Typography>
                        ) : (
                          column.id !== 'orderstatus' &&
                          column.id !== 'status' &&
                          value
                        )}
                        {column.id === 'orderstatus' ||
                        column.id === 'status' ? (
                          <Box
                            sx={{
                              color:
                                value == 'COMPLETED'
                                  ? '#11C15B'
                                  : value === 'REFUNDED'
                                  ? '#FF6A16'
                                  : value === 'PENDING'
                                  ? '#0A8FDC'
                                  : '#FF6A16',
                              backgroundColor:
                                value == 'COMPLETED'
                                  ? '#CFF3DE'
                                  : value === 'REFUNDED'
                                  ? '#F8E0CE'
                                  : value === 'REJECTED'
                                  ? 'red'
                                  : value === 'PENDING'
                                  ? '#CEE9F8'
                                  : '#F8E0CE',
                              padding: '3px 10px',
                              borderRadius: '15px',
                              display: 'inline-block',
                              whiteSpace: 'nowrap',

                              height: '24px',
                            }}
                          >
                            {value}
                          </Box>
                        ) : (
                          ''
                        )}

                        {column.id === 'editdeleteicon' && (
                          <Grid container>
                            <Grid item>
                              <img
                                src={EditIcon}
                                alt='Edit Pencil Icon'
                                style={{
                                  cursor: 'pointer',
                                }}
                                onClick={() => props.onEdit(row)}
                              />
                            </Grid>
                            <Grid item>
                              <img
                                src={TrashIcon}
                                alt='Delete Trash Icon'
                                style={{
                                  cursor: 'pointer',
                                  marginLeft: 15,
                                }}
                                onClick={() => props.onDelete(row['id'])}
                              />
                            </Grid>
                          </Grid>
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

export default RetrunsOrderDetailsTable
