import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/invoices/billingEyeIcon.svg'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export default function MerchantBillingTable(props) {
  const { rows, columns } = props
  let page = 0
  const rowsPerPage = 10
  const navigate = useNavigate()

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
      <Paper sx={{ width: '100%', marginTop: '0', borderRadius: '10px' }}>
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
                            {column.id === 'id' ? (
                              <Box
                                onClick={() => {
                                  localStorage.setItem(
                                    'merchantBillingData',
                                    JSON.stringify(row)
                                  )
                                  return navigate(
                                    `/merchantbilling/details/${row.id}`
                                  )
                                }}
                              >
                                <Typography
                                  variant={'p'}
                                  component={'p'}
                                  color='#ED2079'
                                >
                                  {value}
                                </Typography>
                              </Box>
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
                                  minWidth: '130px',
                                }}
                              >
                                {(
                                  <Typography variant={'p'} component={'p'}>
                                    {value}
                                  </Typography>
                                ) ?? 'COMPLETED'}
                              </Box>
                            ) : column.id === 'viewdetails' ? (
                              <Grid container>
                                <Box
                                  onClick={() => {
                                    localStorage.setItem(
                                      'merchantBillingData',
                                      JSON.stringify(row)
                                    )
                                    return navigate(
                                      `/merchantbilling/details/${row.id}`
                                    )
                                  }}
                                >
                                  <img
                                    src={ViewDetailsEyeIcon}
                                    alt='View Details Eye Icon'
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                  />
                                </Box>
                                <Box
                                  onClick={() => {
                                    localStorage.setItem(
                                      'merchantBillingData',
                                      JSON.stringify(row)
                                    )
                                    return navigate(
                                      `/merchantbilling/details/${row.id}`
                                    )
                                  }}
                                >
                                  <Typography
                                    variant={'p'}
                                    component={'p'}
                                    color='#ED2079'
                                    marginLeft={2}
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                  >
                                    View Invoice
                                  </Typography>
                                </Box>
                              </Grid>
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
        <Grid
          container
          style={{ paddingTop: 20, paddingBottom: 10 }}
          alignItems={'center'}
        >
          <Grid item marginRight={7}>
            <ArrowBackIos
              fontSize='small'
              style={{
                color: props.isFirst ? '#6B7280' : '#111827',
                cursor: props.isFirst ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (props.isFirst) {
                  return
                }
                if (props.currentPage > 1) {
                  props.setCurrentPage(props.currentPage - 1)
                }
              }}
            />
          </Grid>
          <Grid
            item
            style={{ maxWidth: 300, overflow: 'scroll', borderRadius: 20 }}
            className='page-container'
          >
            <Grid container maxHeight={45} style={{ flexWrap: 'nowrap' }}>
              {[...Array(props.totalPages)].map((value, i) => (
                <Box
                  style={
                    props.currentPage === i + 1
                      ? activePageStyle
                      : inActivePageStyle
                  }
                  onClick={() => props.setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid item marginLeft={9}>
            <ArrowForwardIos
              fontSize='small'
              style={{
                color:
                  props.currentPage === props.totalPages
                    ? '#6B7280'
                    : '#111827',
                cursor:
                  props.currentPage === props.totalPages
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() => {
                if (props.currentPage === props.totalPages) {
                  return
                }

                if (props.currentPage < props.totalPages) {
                  props.setCurrentPage(props.currentPage + 1)
                }
              }}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

MerchantBillingTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  isFirst: PropTypes.bool,
  setCurrentPage: PropTypes.func,
  setTotalPages: PropTypes.func,
  setIsFirst: PropTypes.func,
}
