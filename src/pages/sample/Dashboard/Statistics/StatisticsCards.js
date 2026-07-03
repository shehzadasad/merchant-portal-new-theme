import { Box, Grid } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { BiCart, BiGroup, BiLineChart, BiPackage } from 'react-icons/bi'
import { CgFileDocument } from 'react-icons/cg'
import { Fonts } from '../../../../shared/constants/AppEnums'
import { useDispatch, useSelector } from 'react-redux'
import { getStatistics } from 'redux/actions/DashboardAction'
import currencyFormatter from 'currency-formatter'
const getWelcomeIcon = (iconType) => {
  switch (iconType) {
    case 'BiRefunds':
      return <BiPackage color='#E72E80' />
    case 'BiOrders':
      return <BiCart color='#F3AA18' className='icon' />
    case 'BiVisitors':
      return <BiGroup color='#367BF5' className='icon' />
    case 'BiSales':
      return <BiLineChart color='#069697' className='icon' />
    default:
      return <CgFileDocument color='#0A8FDC' className='icon' />
  }
}

const StatisticsCards = ({ StatisticsFilter }) => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [statics, setStatics] = useState([])
  useEffect(() => {
    dispatch(
      getStatistics(userDetail?.merchantId, setStatics, StatisticsFilter)
    )
  }, [userDetail, StatisticsFilter])

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className='stats-cards'
      style={{ marginTop: '20px' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8} md lg>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: { xs: 46, md: 80 },
                height: { xs: 46, md: 80 },
                minWidth: { xs: 46, md: 60 },
                fontSize: { xs: 24, md: 26 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#DAF5F2',
              }}
            >
              {getWelcomeIcon('BiSales')}
            </Box>
            <Box
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                paddingTop: '10px',
              }}
            >
              <Box
                sx={{
                  color: 'text.primary',
                  fontWeight: Fonts.MEDIUM,
                  fontSize: 18,
                  position: 'relative',
                  lineHeight: 1,
                  marginBottom: 0.5,
                }}
                component='h5'
              >
                {currencyFormatter.format(statics?.sales, {
                  code:
                    userDetail?.iso2 === 'PK'
                      ? 'PKR'
                      : userDetail?.iso2 == 'PH'
                      ? 'PHP'
                      : 'USD',
                })}
              </Box>

              <Box component='p'>Sales</Box>
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={8} md lg>
         'flex',
              alignItems: 'center',
            }}
          >
      
            >
              {getWelcomeIcon('BiVisitors')}
            </Box>
            <Box
              sx={{
                color: 'text.secondary',
              }}
          
                  marginBottom: 0.5,
                }}
                component='h5'
              >
                82
              </Box>
              <Box component='p'>Visitors</Box>
            </Box>
          </Box>
        </Grid> */}
        <Grid item xs={8} md lg>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#FCF3D7',
                width: { xs: 46, md: 80 },
                height: { xs: 46, md: 80 },
                minWidth: { xs: 46, md: 60 },
                fontSize: { xs: 24, md: 26 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              {getWelcomeIcon('BiOrders')}
            </Box>
            <Box
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                paddingTop: '10px',
              }}
            >
              <Box
                sx={{
                  color: 'text.primary',
                  fontWeight: Fonts.MEDIUM,
                  fontSize: 18,
                  position: 'relative',
                  lineHeight: 1,
                  marginBottom: 0.5,
                }}
                component='h5'
              >
                {statics?.orders}
              </Box>

              <Box component='p'>Orders</Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8} md lg>
          <Box
            sx={{
              // mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#F292BD42',
                width: { xs: 46, md: 80 },
                height: { xs: 46, md: 80 },
                minWidth: { xs: 46, md: 60 },
                fontSize: { xs: 24, md: 26 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              {getWelcomeIcon('BiRefunds')}
            </Box>
            <Box
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                paddingTop: '10px',
              }}
            >
              <Box
                sx={{
                  color: 'text.primary',
                  fontWeight: Fonts.MEDIUM,
                  fontSize: 18,
                  position: 'relative',
                  lineHeight: 1,
                  marginBottom: 0.5,
                }}
                component='h5'
              >
                {statics.refunds}
              </Box>

              <Box component='p'>Refunds</Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StatisticsCards

StatisticsCards.propTypes = {
  data: PropTypes.array,
}
