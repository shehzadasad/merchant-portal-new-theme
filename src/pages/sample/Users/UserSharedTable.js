import { Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ViewDetailsEyeIcon from 'assets/icon/ViewDetailsIcon.svg'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserSharedTable(props) {
  const { rows, columns } = props
  const [page, setPage] = useState(0)
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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
        }}
        alignItems='center'
      >
        <Grid item xs={7} sm={6} md={7} lg={8}>
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
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
                            <Typography variant={'p'} component={'p'}>
                              {value.length > 0
                                ? value.map((role, index) => (
                                    <>
                                      {role.name}
                                      <span
                                        style={{
                                          visibility:
                                            index === value.length - 1
                                              ? 'hidden'
                                              : 'visible',
                                        }}
                                      >
                                        &nbsp;,&nbsp;
                                      </span>
                                    </>
                                  ))
                                : ''}
                            </Typography>
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
  )
}

UserSharedTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectedRoleChange: PropTypes.func,
  onSelectedTimeRangeChange: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}
