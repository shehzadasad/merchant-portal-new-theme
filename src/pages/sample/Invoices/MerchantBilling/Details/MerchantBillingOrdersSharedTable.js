import { Box, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from 'assets/icon/EditIcon.svg'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
export default function MerchantBillingOrdersSharedTable(props) {
  const { rows, columns } = props
  const userDetail = useSelector((state) => state.users.userDetail)
  const activePageStyle = {
    color: 'white',
    padding: 3,
    borderRadius: 50,
    minWidth: 40,
    maxWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#ED2079',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  const inActivePageStyle = {
    color: 'black',
    padding: 3,
    borderRadius: 50,
    minWidth: 40,
    maxWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: '#ECECEC',
    marginRight: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }

  return (
    <>
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
              {props.title ? props.title : 'Orders'}
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
              {rows.map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'number' ? (
                            <Typography variant={'p'} component={'p'}>
                              {index + 1}
                            </Typography>
                          ) : column.id === 'order_id' ||
                            column.id === 'order_number' ? (
                            <Link to={props.detailsURL + `/${row['order_id']}`}>
                              <Typography
                                variant={'p'}
                                component={'p'}
                                color='#ED2079'
                              >
                                {value}
                              </Typography>
                            </Link>
                          ) : column.id === 'date' ? (
                            <Typography variant={'p'} component={'p'}>
                              {moment(value).format('DD-MMM-YYYY kk:mm:ss')}
                            </Typography>
                          ) : column.id === 'status' ? (
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
                                    : value === 'PENDING'
                                    ? '#CEE9F8'
                                    : '#F8E0CE',
                                padding: '3px 10px',
                                borderRadius: '15px',
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                width: '140px',
                                height: '24px',
                              }}
                            >
                              {value}
                            </Box>
                          ) : column.id === 'view-details' ? (
                            <Link to={props.detailsURL + `/${row['order_id']}`}>
                              <img
                                src={ViewDetailsEyeIcon}
                                alt='View Details Eye Icon'
                                style={{
                                  cursor: 'pointer',
                                }}
                              />
                            </Link>
                          ) : column.id === 'editdeleteicon' ? (
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
                          ) : column.id === 'fee' || column.id === 'amount' ? (
                            <Typography variant={'p'} component={'p'}>
                             ${ userDetail?.iso2==='PK'? 'Rs' : userDetail?.iso2==='PH'?'₱': '$ '}
                              {value}
                            </Typography>
                          ) : (
                            <Typography variant={'p'} component={'p'}>
                              {value}
                            </Typography>
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
    </>
  )
}

MerchantBillingOrdersSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}
