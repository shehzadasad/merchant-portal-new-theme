import React from 'react'
import Chart from 'react-apexcharts'
import { useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
const LineChart = ({
  title,
  ordersByCities,
  averageOrder,
  revenueData,
  noOfOrdersData,
}) => {
  const userDetail = useSelector((state) => state.users.userDetail)
  const revData = revenueData?.map((i) => i.revenue)

  const revanuDate = revenueData?.map((i) => i.date)

  const isSm = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const orderDate = noOfOrdersData?.map((i) => i.date)
  const totalOrdersData = noOfOrdersData?.map((i) => i.numberOfOrders)

  return (
    <Chart
      options={{
        annotations: {
          xaxis: [
            {
              x:
                new Date(revanuDate?.[0]).getTime() ||
                new Date(orderDate?.[0]).getTime(),
            },
            {
              x:
                new Date(revanuDate?.[7]).getTime() ||
                new Date(orderDate?.[7]).getTime(),
              // x2: new Date(revanuDate?.[14]).getTime() || new Date(orderDate?.[14]).getTime(),
            },
          ],
          points: [
            {
              x:
                new Date(revanuDate?.[21]).getTime() ||
                new Date(orderDate?.[21]).getTime(),
              y: 8607.55,
            },
          ],
        },

        chart: {
          height: 300,
          type: 'line',
          toolbar: 'false',
          markers: {
            size: 0,
          },
        },

        dataLabels: {
          enabled: false,
        },
        colors: ['#E72E80'],
        stroke: {
          curve: 'smooth',
        },
        grid: {
          padding: {
            right: 30,
            left: 20,
          },
        },
        marker: {
          show: false,
        },
        labels: revanuDate || orderDate,
        xaxis: {
          type: 'datetime',
        },
      }}
      series={[
        {
          data: revData || totalOrdersData,
        },
      ]}
    />
  )
}

export default LineChart
