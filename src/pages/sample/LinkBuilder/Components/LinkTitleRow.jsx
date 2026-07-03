import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchLinks } from 'redux/actions/LinkBuilder'
import axios from 'axios'
import SharedSearchBox from 'shared/components/SharedSearchBox'
var encodeUrl = require('encodeurl')
const LinkTitleRow = ({
  getData,

  title,
  exportCSV,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const handleCreateNewPaymentLink = () => {
    navigate('/create-payment-link')
  }
  return (
    <React.Fragment>
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
            <Grid item>
              <Button
                varaint='contained'
                sx={{
                  background: '#e93a7d',
                  borderRadius: '28px',
                  color: '#fff',

                  marginRight: '18px',
                  paddingX: '20px',
                  '&:hover': {
                    background: '#e93a7d',
                  },
                }}
                onClick={handleCreateNewPaymentLink}
              >
                Create New Payment Link
              </Button>
            </Grid>

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
                  dispatch(searchLinks(userDetail?.id, obj, getData))
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    let value = e.target.value
                    var obj = encodeUrl(value)
                    dispatch(
                      searchLinks(
                        userDetail?.id,

                        obj,
                        getData
                      )
                    )
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default LinkTitleRow
