import axios from 'axios'
export const getOrdersByCities = (
    dataObj,
    setOrdersByCities,
    ordersByCityFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url:ordersByCityFilter ? `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getOrdersByCities?filter=${ordersByCityFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getOrdersByCities`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
       
          setOrdersByCities(response.data.body)
         
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getTopCustomers = (
    dataObj,
    setTopCustomers,
    topCustomerFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url:topCustomerFilter ? `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getTopCustomers?filter=${topCustomerFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getTopCustomers`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
      
          setTopCustomers(response.data.body)
         
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getStatistics = (
    dataObj,
    setStatics,
    StatisticsFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url: StatisticsFilter ?`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getStatistics?filter=${StatisticsFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getStatistics`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
      
     
          setStatics(response.data.body)
         
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getOrdersSuccessful= (
    dataObj,
    setOrderSuccessfull,
    ordersSuccessfullFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url:ordersSuccessfullFilter? `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getOrdersSuccessful?filter=${ordersSuccessfullFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getOrdersSuccessful`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
 
         setOrderSuccessfull(response.data.body)
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getAverageOrderBySource=(
    dataObj,
    setAverageOrderByValue,
    averageOrderFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url: averageOrderFilter? `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getAverageOrderBySource?filter=${averageOrderFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getAverageOrderBySource`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
      
         setAverageOrderByValue(response.data.body)
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getTransactions=(
    dataObj,
    setTransactionData,
    transactionFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url: transactionFilter ?`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getTransactions?filter=${transactionFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getTransactions`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
   
         setTransactionData(response.data.body)
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getTopProducts=(
    dataObj,
    setTopProducts,
    topProductsFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url:topProductsFilter? `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getTopProducts?filter=${topProductsFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getTopProducts`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
      
         setTopProducts(response.data.body)
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }
  export const getRevenueAndOrderCount=(
    dataObj,
    setRevenueData,
    revenueFilter
  ) => {
    return () => {
      const config = {
        method: 'get',
        url:revenueFilter? `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getRevenueAndOrderCount?filter=${revenueFilter}`:`${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getRevenueAndOrderCount`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
      

         setRevenueData(response.data.body)
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }

  export const getUserDevices=(
    dataObj,
    setDeviceData
  ) => {
    return () => {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/dashboard/getUserDevices`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: dataObj,
      }
  
      axios(config)
        .then(function (response) {
      
         setDeviceData(response.data.body)
        })
        .catch(function (error) {
        
          console.log(error, 'error')
        
        })
    }
  }