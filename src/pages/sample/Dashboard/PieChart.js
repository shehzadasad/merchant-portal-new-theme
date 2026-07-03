import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
function Piechart({data}) {

 

  return (
    <>
      <Chart
        type='pie'
        // width={349}
        // height={700}
        series={[data?.androidCount, data?.ioscount]}
        options={{
          // title: { text: 'Student PieChart' },
          noData: { text: 'Empty Data' },
          colors: ['#F292BD', '#E72E80'],
          labels: ['Android', 'IOS'],
          legend: {
            position: 'bottom',
          },
        }}
      ></Chart>
    </>
  )
}
export default Piechart
