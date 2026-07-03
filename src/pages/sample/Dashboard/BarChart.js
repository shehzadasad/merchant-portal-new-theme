import React from 'react'
import Chart from 'react-apexcharts'
import { useMediaQuery } from '@mui/material'
import moment from 'moment'
const BarChart = ({
  title,
  ordersByCities,
  averageOrder,
  revenueData,
  noOfOrdersData,
}) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const cityName = ordersByCities?.cityOrderSharePercentages?.map(
    (i) => i.cityName
  )
  const cityByPercentage = ordersByCities?.cityOrderSharePercentages?.map(
    (i) => `${Math.round(i?.percentage)}%`
  )

  const averageOrderDate = averageOrder
    ?.filter((f) => f.orderSource === '1CC')
    .map(
      (i) =>
        new Date(i.date).getDate() +
        moment(new Date(i.date)).format('MMM').charAt(0)
    )
  const averageOrder1ClickCheckout = averageOrder
    ?.filter((f) => f.orderSource === '1CC')
    .map((i) => Math.round(i.aov))
  const averageOrderGuestCheckout = averageOrder
    ?.filter((f) => f.orderSource === 'GUEST')
    .map((i) => Math.round(i.aov))
  const averageOrderStackPayment = averageOrder
    ?.filter((f) => f.orderSource === 'StackPayment')
    .map((i) => Math.round(i.aov))
  const revData = revenueData?.map((i) => i.revenue)

  const revanuDate = revenueData?.map((i) => new Date(i.date).getDate() + ' D')
  const orderDate = noOfOrdersData?.map(
    (i) => new Date(i.date).getDate() + ' D'
  )

  const totalOrdersData = noOfOrdersData?.map((i) => i.numberOfOrders)

  return (
    <Chart
      type='bar'
      width={isSm ? 310 : 510}
      height={isSm ? 200 : 300}
      series={
        title === 'averageOrders'
          ? [
              {
                name: 'Guest checkout',
                data: averageOrderGuestCheckout,
              },
              {
                name: '1-Click Checkout',
                data: averageOrder1ClickCheckout,
              },
              {
                name: 'Order Stack Payment',
                data: averageOrderStackPayment,
              },
            ]
          : title === 'conversionRate'
          ? [
              {
                name: 'total orders',
                data: [324, 522, 754],
              },
            ]
          : title === 'revenue'
          ? [
              {
                name: 'total revenue',
                data: revData,
              },
            ]
          : title === 'orders'
          ? [
              {
                name: 'total orders',
                data: totalOrdersData,
              },
            ]
          : title === 'mapcities'
          ? [{ data: cityByPercentage }]
          : [
              {
                name: 'total ',
                data: [1324, 3322, 3354, 3646, 3796, 1589],
              },
            ]
      }
      options={{
        chart: {
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories:
            title === 'conversionRate'
              ? ['Added to cart', 'Reached Checkout', 'Sessions converted']
              : title === 'mapcities'
              ? cityName
              : title === 'revenue'
              ? revanuDate
              : title === 'orders'
              ? orderDate
              : title === 'averageOrders'
              ? averageOrderDate
              : [],
        },

        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return Number(val).toLocaleString() + '€'
          },
          offsetY: -20,
        },

        plotOptions: {
          bar: {
            distributed: title === 'conversionRate' ? true : false,
            horizontal:
              title === 'conversionRate' || title === 'mapcities'
                ? true
                : false,
          },
        },
        colors:
          title === 'conversionRate'
            ? ['#F3AA18', '#069697', '#367BF5']
            : title === 'orders'
            ? ['#367BF5']
            : title === 'averageOrders'
            ? ['#E72E80', '#F292BD', '#FDE6FA']
            : ['#E72E80'],
      }}
    ></Chart>
  )
}

export default BarChart
