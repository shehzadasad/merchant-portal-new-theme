import { AppCard } from '@crema'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
]

function createData(name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
  createData('United States', 'US', 327167434, 9833520),
]

export default function PaymentViewOne() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  return (
    <AppCard sx={{ width: '100%', maxHeight: 320 }}>
      <TableContainer sx={{ maxHeight: 320 }}>
        <Table aria-label='table'>
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                colSpan={2}
                style={{ backgroundColor: 'white' }}
              >
                Country
              </TableCell>
              <TableCell
                align='center'
                colSpan={3}
                style={{ backgroundColor: 'white' }}
              >
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    backgroundColor: 'white',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </AppCard>
  )
}
