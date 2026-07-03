import React from 'react'
import Chart from 'react-apexcharts'
function Piechart({ title, data, labels }) {
  return (
    <>
      {data ? (
        <Chart
          type='donut'
          width={200}
          height={400}
          series={
            title === 'transactions'
              ? [data?.numberGuest, data?.number1CC, data?.numberStackPayment]
              : [data?.successFulOrderCount, data?.otherOrderCount]
          }
          options={{
            // title: { text: 'Student PieChart' },
            noData: { text: 'Empty Data' },
            colors: [
              title === 'transactions' ? '#367BF5' : '#F292BD',
              title === 'transactions' ? '#241571' : '#E72E80',
              title === 'transactions' ? '#00FFFF' : '',
            ],
            labels: labels,
            legend: {
              position: 'bottom',
            },
          }}
        ></Chart>
      ) : (
        'Loading'
      )}
    </>
  )
}
export default Piechart
