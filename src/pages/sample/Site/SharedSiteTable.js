import { Grid, Typography } from '@mui/material'
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
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export default function SharedSiteTable(props) {
  const { rows, columns } = props
  let page = 0
  const rowsPerPage = 10
  const navigate = useNavigate()

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
                            {column.id === 'id' ? (
                              <Typography
                                variant={'p'}
                                component={'p'}
                                color='#ED2079'
                                style={{
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  localStorage.setItem('siteDetails', row['id'])
                                  localStorage.setItem(
                                    'siteAccessToken',
                                    row['credentials'].access_token
                                      ? row['credentials'].access_token
                                      : ''
                                  )
                                  return navigate('/site/view')
                                }}
                              >
                                {value}
                              </Typography>
                            ) : column.id === 'vieweditdeleteicon' ? (
                              <Grid container alignItems={'center'}>
                                <Grid item>
                                  <img
                                    src={ViewDetailsEyeIcon}
                                    alt='View Details Eye Icon'
                                    style={{
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                      localStorage.setItem(
                                        'siteDetails',
                                        row['id']
                                      )
                                      localStorage.setItem(
                                        'siteAccessToken',
                                        row['credentials'].access_token
                                          ? row['credentials'].access_token
                                          : ''
                                      )
                                      return navigate('/site/view')
                                    }}
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
                                    onClick={() => props.deleteSite(row['id'])}
                                  />
                                </Grid>
                                <Grid item>
                                  <img
                                    src={EditIcon}
                                    alt='Edit Pencil Icon'
                                    style={{
                                      cursor: 'pointer',
                                      marginLeft: 15,
                                    }}
                                    onClick={() => {
                                      const object = {
                                        id: row['id'],
                                        domain: row['domain'],
                                        credentials: row['credentials'],
                                        platform: row['platform'],
                                        adminUrl: row.admin_url ?? '',
                                      }
                                      localStorage.setItem(
                                        'updateSiteDetails',
                                        JSON.stringify(object)
                                      )
                                      return navigate(`/site/edit/${row['id']}`)
                                    }}
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
    </>
  )
}

SharedSiteTable.propTypes = {
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
