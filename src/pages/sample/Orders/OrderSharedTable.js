import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
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
import SharedMultiSelect from 'shared/components/SharedMultiSelect'
import SharedPagination from 'shared/components/SharedPagination/SharedPagination'
import currencyFormatter from 'currency-formatter'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
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
  width: '70%',
}))

export default function OrderSharedTable(props) {
  const userDetail = useSelector((state) => state.users.userDetail)
  const { rows, columns } = props

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
          <Grid
            item
            style={{
              width: 200,
              marginRight: 10,
            }}
          >
            <SharedMultiSelect
              names={['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days']}
              label={'Filter By Date'}
              onChange={(e) => console.log(e)}
              multiple={false}
              onSelect={props.selectDate}
              crossBtn={true}
              fetchOrdersHelper={props.fetchOrdersHelper}
            />
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
                          ) : column.id === 'ep_account_no' ? (
                            <Typography variant={'p'} component={'p'}>
                              {value ? value : '-'}
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
                              {currencyFormatter.format(value, {
                                code:
                                  userDetail?.iso2 === 'PK'
                                    ? 'PKR'
                                    : userDetail?.iso2 == 'PH'
                                    ? 'PHP'
                                    : 'USD',
                              })}
                            </Typography>
                          ) : column.id === 'amount' ? (
                            <Typography variant={'p'} component={'p'}>
                              {currencyFormatter.format(parseInt(value), {
                                code:
                                  userDetail?.iso2 === 'PK'
                                    ? 'PKR'
                                    : userDetail?.iso2 == 'PH'
                                    ? 'PHP'
                                    : 'USD',
                              })}
                            </Typography>
                          ) : column.id === 'merchant_installments' ? (
                            <Typography
                              variant={'p'}
                              component={'p'}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {value.total_installments ? (
                                <>
                                  {value.paid_installments}/
                                  {value.total_installments}
                                  <BorderLinearProgress
                                    variant='determinate'
                                    value={
                                      value.paid_installments === 1
                                        ? 25
                                        : value.paid_installments === 2
                                        ? 50
                                        : value.paid_installments === 3
                                        ? 75
                                        : value.paid_installments === 4
                                        ? 100
                                        : 0
                                    }
                                    style={{ marginLeft: '10px' }}
                                  />
                                </>
                              ) : (
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                  }}
                                >
                                  -
                                </div>
                              )}
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
      {rows.length > 0 ? (
        <Grid item className='page-container'>
          <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
            <SharedPagination
              totalRecords={props.totalOrders}
              NumberOfRecordsPerPage={props.pageLimit}
              totalPages={props.totalPages}
              setRecord={props.setCurrentPage}
              record={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              currentPage={props.currentPage}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ padding: '30px 0' }}>Order does not exist</Typography>
      )}
    </>
  )
}

OrderSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}
