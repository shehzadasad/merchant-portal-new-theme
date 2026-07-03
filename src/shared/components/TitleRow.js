import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReturnsOrderFilterSearch } from 'redux/actions/ReturnAction'
import axios from 'axios'
import SharedSearchBox from 'shared/components/SharedSearchBox'
var encodeUrl = require('encodeurl')
const TitleRow = ({
  setGetAllReturnData,
  setGetAllReturnOrder,
  title,
  exportCSV,
}) => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const handleCSVExport = () => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-return-service/merchant-return/merchant/${userDetail?.merchantId}/orderCsv`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        var blob = new Blob([response.data], {
          type: 'text/csv;charset=utf-8;',
        })
        var url = URL.createObjectURL(blob)

        var pom = document.createElement('a')
        pom.href = url
        pom.setAttribute('download', 'orders.csv')
        pom.click()

        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <Grid
      container
      alignItems='center'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Typography variant='h1' component='h2'>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          {exportCSV && (
            <Grid item>
              <Button
                text='Export CSV'
                style={{
                  background: '#e93a7d',
                  borderRadius: 50,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: 150,
                  border: 'none',
                  height: 40,
                  cursor: 'pointer',
                  marginRight: 10,
                }}
                // disabled = {getAllReturnOrder.length<0? true : false}
                onClick={handleCSVExport}
              >
                Export CSV
              </Button>
            </Grid>
          )}
          <Grid
            item
            style={{
              marginRight: 10,
            }}
          >
            <SharedSearchBox
              onClick={(e) => {
                let value = e.target.value
                var obj = encodeUrl(value)
                dispatch(
                  getAllReturnsOrderFilterSearch(
                    userDetail?.merchantId,
                    setGetAllReturnOrder,
                    setGetAllReturnData,
                    obj,
                    'search'
                  )
                )
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  let value = e.target.value
                  var obj = encodeUrl(value)
                  dispatch(
                    getAllReturnsOrderFilterSearch(
                      userDetail?.merchantId,
                      setGetAllReturnOrder,
                      setGetAllReturnData,
                      obj,
                      'search'
                    )
                  )
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TitleRow
