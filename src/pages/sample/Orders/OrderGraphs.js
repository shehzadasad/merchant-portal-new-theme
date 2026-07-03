import React from 'react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import Box from '@mui/material/Box'

const IncomeGraph = ({ data }) => {
  return (
    <ResponsiveContainer height={200} width='100%'>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='color15' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#FFA940' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#FFF5F7' stopOpacity={0.8} />
          </linearGradient>
        </defs>

        <Area
          type='monotone'
          dataKey='revenue'
          stroke='#FFA940'
          strokeWidth={3}
          fill='url(#color15)'
          dot={{ r: 0 }}
        />
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={
            <Box
              component='span'
              sx={{
                p: 4,
                color: 'text.primary',
              }}
            >
              $45000
            </Box>
          }
          wrapperStyle={{
            background: '#FFA940',
            borderRadius: 10,
            radius: 10,
            overflow: 'hidden',
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default IncomeGraph

IncomeGraph.defaultProps = {
  data: [
    { name: '', revenue: 2000 },
    { name: '$2000', revenue: 10000 },
    { name: '', revenue: 8000 },
    { name: '$19000', revenue: 19000 },
    { name: '', revenue: 15000 },
    { name: '$28000', revenue: 28000 },
    { name: '', revenue: 20000 },
    { name: '$55000', revenue: 65000 },
    { name: '', revenue: 45000 },
  ],
}

IncomeGraph.propTypes = {
  data: [
    { name: '', revenue: 2000 },
    { name: '$2000', revenue: 10000 },
    { name: '', revenue: 8000 },
    { name: '$19000', revenue: 19000 },
    { name: '', revenue: 15000 },
    { name: '$28000', revenue: 28000 },
    { name: '', revenue: 20000 },
    { name: '$55000', revenue: 65000 },
    { name: '', revenue: 45000 },
  ],
}
