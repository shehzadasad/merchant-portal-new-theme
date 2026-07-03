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
import PropTypes from 'prop-types'

export default function SharedTaxTable(props) {
  const { rows, columns } = props
  let page = 0
  const rowsPerPage = 10

  const activePageStyle = {
    padding: 3,
    color: 'white',
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
    color: 'white',
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
                            {column.id === 'emoji' ? (
                              <Typography
                                variant={'p'}
                                component={'p'}
                                marginRight={-30}
                                fontSize={20}
                              >
                                {value}
                              </Typography>
                            ) : column.id === 'taxPercentage' ? (
                              <Typography variant={'p'} component={'p'}>
                                {value} %
                              </Typography>
                            ) : column.id === 'taxOnShipping' ? (
                              value === true ? (
                                <Typography variant={'p'} component={'p'}>
                                  Yes
                                </Typography>
                              ) : (
                                <Typography variant={'p'} component={'p'}>
                                  No
                                </Typography>
                              )
                            ) : column.format === 'array' ? (
                              <Typography variant={'p'} component={'p'}>
                                {value.join(' , ')}
                              </Typography>
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

SharedTaxTable.propTypes = {
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
