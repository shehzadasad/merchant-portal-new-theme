import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterUsers, getUsersList } from 'redux/reducers/Users'
import './CustomUsersCSS.css'
import UsersGridTable from './UsersGridTable'
import UsersTopRow from './UsersTopRow'

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'email',
    label: 'Email Address',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'phoneNumber',
    label: 'Phone\u00a0Number	',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'roles',
    label: 'Role',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'view-details',
    label: ' ',
    minWidth: 170,
    align: 'center',
    format: 'img',
  },
]

const UsersWrapper = () => {
  document.title = 'Users | QisstPay - Merchants'
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(10)
  const [isFirst, setIsFirst] = useState(true)

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const pageData = useSelector((state) => state.users.pageData)
  const userDetail = useSelector((state) => state.users.userDetail)

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.currentPage ? pageData.currentPage + 1 : 1)
      setIsFirst(pageData.first ?? true)
      setTotalPages(pageData.totalPages ?? 1)
    }
  }, [pageData])

  useEffect(() => {
    if (userDetail) {
      if (userDetail.merchantId) {
        if (currentPage) {
          localStorage.removeItem('userDetailsData')
          dispatch(
            getUsersList(userDetail.merchantId, parseInt(currentPage) - 1)
          )
        }
      }
    }
  }, [userDetail.merchantId, currentPage])

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <UsersTopRow />
      <UsersGridTable
        rows={users}
        columns={columns}
        selectRole={true}
        onSelectedTimeRangeChange={(e) => setSelectedTimeRange(e.target.value)}
        onSelectedRoleChange={(e) => setSelectedRole(e.target.value)}
        selectedRole={selectedRole}
        selectedTimeRange={selectedTimeRange}
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={isFirst}
        setCurrentPage={(e) => setCurrentPage(e)}
        setTotalPages={(e) => setTotalPages(e)}
        setIsFirst={(e) => setIsFirst(e)}
      />
    </Grid>
  )
}

export default UsersWrapper
