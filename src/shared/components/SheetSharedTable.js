import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import EditIcon from 'assets/icon/EditIcon.svg'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SharedPagination from './SharedPagination/SharedPagination'
import currencyFormatter from 'currency-formatter'
import { useSelector } from 'react-redux'
export default function SheetSharedTable(props) {
  const userDetail = useSelector((state) => state.users.userDetail)
  const { rows, columns } = props
  let page = 0
  const rowsPerPage = 10

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
          }}
          alignItems='center'
        >
          <Grid item xs={7} sm={6} md={7} lg={8}>
            <Typography
              variant='p'
              component='p'
              fontWeight={500}
              fontSize={18}
            >
              {props.title ? props.title : 'Users'}
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
                    <Typography variant={'p'} component={'p'} fontWeight={500}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(column?.format !== 'date' &&
                              column.id === 'orderId') ||
                            column.id === 'order_id' ||
                            column.id === 'order_number' ||
                            (column.id === 'id' &&
                              column.id !== 'orderstatus') ? (
                              <Link
                                to={
                                  props.detailsURL &&
                                  props.detailsURL.length > 0
                                    ? props.detailsURL + `/${row['order_id']}`
                                    : props.URL !== undefined &&
                                      props.URL.length > 0
                                    ? props.URL
                                    : props.billingURL !== undefined &&
                                      props.billingURL.length > 0
                                    ? props.billingURL + `/${row['id']}`
                                    : props.sheetsURL !== undefined &&
                                      props.sheetsURL.length > 0
                                    ? props.sheetsURL + `/${row['id']}`
                                    : `/users/details/${row['id']}`
                                }
                              >
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value}
                                </Typography>
                              </Link>
                            ) : column?.format &&
                              typeof value === 'number' &&
                              column.id !== 'orderstatus' ? (
                              <Typography variant={'p'} component={'p'}>
                                {currencyFormatter.format(value, {
                                  code:
                                    userDetail?.iso2 === 'PK'
                                      ? 'PKR'
                                      : userDetail?.iso2 == 'PH'
                                      ? 'PHP'
                                      : 'USD',
                                })}
                              </Typography>
                            ) : column.format === 'date' ? (
                              <Typography variant={'p'} component={'p'}>
                                <Typography variant={'p'} component={'p'}>
                                  {moment(value).format('DD-MMM-YYYY kk:mm:ss')}
                                </Typography>
                              </Typography>
                            ) : (
                              column.id !== 'orderstatus' &&
                              column.id !== 'status' && (
                                <Typography variant={'p'} component={'p'}>
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                </Typography>
                              )
                            )}
                            {column.id === 'orderstatus' ||
                            column.id === 'status' ? (
                              <Box
                                sx={{
                                  color: '#11C15B',
                                  backgroundColor: '#CFF3DE',
                                  padding: '3px 10px',
                                  borderRadius: '15px',
                                  display: 'inline-block',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {(
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                ) ?? 'COMPLETED'}
                              </Box>
                            ) : (
                              ''
                            )}
                            {column.id === 'view-details' && (
                              <Link
                                to={
                                  props.detailsURL &&
                                  props.detailsURL.length > 0
                                    ? props.detailsURL + `/${row['order_id']}`
                                    : props.URL !== undefined &&
                                      props.URL.length > 0
                                    ? props.URL
                                    : props.billingURL !== undefined &&
                                      props.billingURL.length > 0
                                    ? props.billingURL + `/${row['id']}`
                                    : props.sheetsURL !== undefined &&
                                      props.sheetsURL.length > 0
                                    ? props.sheetsURL + `/${row['id']}`
                                    : `/users/details/${row['id']}`
                                }
                              >
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                />
                              </Link>
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
      {rows.length > 0 ? (
        <SharedPagination
          totalRecords={props.totalOrders}
          NumberOfRecordsPerPage={props.pageLimit}
          totalPages={props.totalPages}
          setRecord={props.setCurrentPage}
          record={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          currentPage={props.currentPage}
        />
      ) : (
        ''
      )}
    </>
  )
}

SheetSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  setCurrentPage: PropTypes.func,
}
