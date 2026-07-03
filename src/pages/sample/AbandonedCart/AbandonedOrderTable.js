import React from 'react'

import {
  Paper,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  TableBody,
} from '@mui/material'
import { Link } from 'react-router-dom'
import currencyFormatter from 'currency-formatter'
import EditIcon from 'assets/icon/EditIcon.svg'

const AbandonedOrderTable = ({ rows, totalAmount }) => {
  const columns = [
    // {
    //   id: 'order_id',
    //   label: 'ORDER\u00a0ID',
    //   minWidth: 80,
    // },
    {
      id: 'product',
      label: 'Product',
      minWidth: 180,
      align: 'left',
    },
    {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'unit_price',
      label: 'Unit Price',
      minWidth: 100,
      align: 'center',
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'total_price',
      label: 'Total_Price',
      minWidth: 100,
      align: 'center',
    },
  ]
  return (
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
          <Typography variant='p' component='p' fontWeight={500} fontSize={18}>
            Users
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
            {rows.product.map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'product' ? (
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <img
                              src={row.src}
                              alt='img'
                              style={{
                                height: '45pt',
                              }}
                            />
                            <Typography
                              variant={'p'}
                              component={'p'}
                              // color='#ED2079'
                              style={{ marginLeft: '5pt' }}
                            >
                              {row.title}
                            </Typography>
                          </div>
                        ) : column.id === 'quantity' ? (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            // color='#ED2079'
                          >
                            {row.quantity}
                          </Typography>
                        ) : column.id === 'unit_price' ? (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            // color='#ED2079'
                          >
                            {localStorage.getItem('currency')}
                            {currencyFormatter.format(row.price, {
                              code: localStorage.getItem('currency'),
                            })}
                          </Typography>
                        ) : column.id === 'total_price' ? (
                          <Typography
                            variant={'p'}
                            component={'p'}
                            // color='#ED2079'
                          >
                            {localStorage.getItem('currency')}
                            {currencyFormatter.format(totalAmount, {
                              code: localStorage.getItem('currency'),
                            })}
                          </Typography>
                        ) : (
                          <div
                            style={{
                              paddingLeft: '15pt',
                            }}
                          >
                            -
                          </div>
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

export default AbandonedOrderTable
