import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

function createData(
  gateway,
  impressions,
  clicks,
  approvalRate,
  cartConversionRate,
  AOV
) {
  return {
    gateway,
    impressions,
    clicks,
    approvalRate,
    cartConversionRate,
    AOV,
  }
}

const rows = [
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
  createData('Klarna', 29.78, 15.3, 72.1, 42.5, 118.09),
]

export default function PaymentGatewaysTable() {
  return (
    <TableContainer>
      <Table
        sx={{ maxHeight: 350, overflow: 'scroll' }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Payment Gateways</TableCell>
            <TableCell align='right'>Impressions</TableCell>
            <TableCell align='right'>Click - through Rate</TableCell>
            <TableCell align='right'>Approval Rate</TableCell>
            <TableCell align='right'>Cart Conversion Rate</TableCell>
            <TableCell align='right'>AOV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <TableCell component='th' scope='row'>
                {row.gateway}
              </TableCell>
              <TableCell align='right'>{row.impressions}</TableCell>
              <TableCell align='right'>{row.clicks}</TableCell>
              <TableCell align='right'>{row.approvalRate}</TableCell>
              <TableCell align='right'>{row.cartConversionRate}</TableCell>
              <TableCell align='right'>{row.AOV}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
