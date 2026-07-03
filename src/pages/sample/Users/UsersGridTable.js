import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRoles, filterUsers } from 'redux/reducers/Users'

import './CustomUsersCSS.css'

export default function UsersGridTable(props) {
  const { rows, columns } = props
  const [page, setPage] = useState(0)
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const roles = useSelector((state) => state.users.roles)
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()

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

  const handleTimeChange = (value) => {
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
    } else {
      console.log(1)
      return
    }

    const data = {
      dateStr: toDateStr,
      fromDateStr: fromDateStr,
    }

    dispatch(filterUsers(data, userDetail.merchantId))
  }

  const handleRoleChange = (value) => {
    const data = {
      role: value,
    }

    dispatch(filterUsers(data, userDetail.merchantId))
  }

  useEffect(() => {
    dispatch(fetchRoles())
  }, [])

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
                    {column.label}
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
                            {column.id === 'roles' ? (
                              value.map((role, index) => (
                                <Grid
                                  container
                                  alignItems={'center'}
                                  justifyContent={'center'}
                                >
                                  <Typography component={'p'} variant={'p'}>
                                    {role.name}
                                  </Typography>
                                  <Typography
                                    component={'p'}
                                    variant={'p'}
                                    style={{
                                      visibility:
                                        index + 1 === value.length
                                          ? 'hidden'
                                          : 'visible',
                                    }}
                                  >
                                    &nbsp;,&nbsp;
                                  </Typography>
                                </Grid>
                              ))
                            ) : column.id === 'view-details' ? (
                              <Link to={`/users/details/${row['id']}`}>
                                <img
                                  src={ViewDetailsEyeIcon}
                                  alt='View Details Eye Icon'
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                />
                              </Link>
                            ) : (
                              <Typography component={'p'} variant={'p'}>
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
                props.currentPage === props.totalPages ? '#6B7280' : '#111827',
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
    </>
  )
}

UsersGridTable.propTypes = {
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
