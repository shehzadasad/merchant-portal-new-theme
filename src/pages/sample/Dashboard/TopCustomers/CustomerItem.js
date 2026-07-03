import React from 'react'
import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'
const CustomerItem = ({ item, columns, tableData }) => {
  const navigate = useNavigate()
  const userDetail = useSelector((state) => state.users.userDetail)
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={uuidv4()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .filter((i, idx) => idx < 5)
              ?.map((item, index) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={uuidv4()}>
                  {columns.map((column) => {
                    const value = item[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'orderCount' ? (
                          <Typography variant={'p'}>
                            {item.orderCount}
                          </Typography>
                        ) : column.id === 'name' ? (
                          <Typography variant={'p'} component={'p'}>
                            {item.name}
                          </Typography>
                        ) : column.id === 'aov' ? (
                          <Typography variant={'p'} component={'p'}>
                            {userDetail?.iso2 === 'PK'
                              ? 'Rs'
                              : userDetail?.iso2 === 'PH'
                              ? '₱'
                              : '$ '}{' '}
                            {item.aov.toFixed(2)}
                          </Typography>
                        ) : column.id === 'customerUserId' ? (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            color='#ED2079'
                            className='modalText'
                            onClick={() =>
                              navigate(
                                `/customers/details/${item.customerUserId}`
                              )
                            }
                          >
                            {item.customerUserId}
                          </Typography>
                        ) : column.id === 'no' ? (
                          <Typography variant={'p'} component={'p'}>
                            {index + 1}
                          </Typography>
                        ) : column.id === 'price' ? (
                          <Typography variant={'p'} component={'p'}>
                            {userDetail?.iso2 === 'PK'
                              ? 'Rs'
                              : userDetail?.iso2 === 'PH'
                              ? '₱'
                              : '$ '}{' '}
                            {item.price.toFixed(1)}
                          </Typography>
                        ) : column.id === 'volume' ? (
                          <Typography variant={'p'} component={'p'}>
                            {item.volume}
                          </Typography>
                        ) : column.id === 'title' ? (
                          <Box display='flex'>
                            <img
                              src={item.imageURL}
                              alt=''
                              style={{
                                marginRight: '10px',
                                width: '30px',
                                height: '30px',
                              }}
                            />
                            <Typography variant={'p'} component={'p'}>
                              {item.title}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant={'p'} component={'p'}>
                            {item.orders}
                          </Typography>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CustomerItem

CustomerItem.propTypes = {
  item: PropTypes.object.isRequired,
}
