import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LinkBuilderTable from './LinkBuildreTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPaymentLinks } from 'redux/actions/LinkBuilder'
import DotLoader from 'react-spinners/DotLoader'
const LinkBuilder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [data, setData] = React.useState([])
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    dispatch(getAllPaymentLinks(userDetail?.id, setData, '', setLoader))
  }, [userDetail])

  return (
    <React.Fragment>
      {loader === true ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '30pt',
            }}
          >
            <DotLoader color='#e93a7d' />
          </div>
        </>
      ) : loader === false && !data ? (
        <>
          <Typography variant='h2' marginBottom={'20px'}>
            Link Builder
          </Typography>

          <Box bgcolor={'#fff'} padding={'20px'}>
            <Box
              // height={discountsData.length > 1 ? '340px' : ''}
              sx={{ overflowY: 'hidden' }}
            >
              <Box sx={{ overflowY: 'scroll' }} padding='20px'></Box>
            </Box>
            <Box
              display={'flex'}
              flexDirection='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <Box
                marginTop='20px'
                component={'img'}
                src='./assets/icons/copyIcon.svg'
                Width='50px'
                height='25px'
                marginBottom={'20px'}
              />
              <Typography marginBottom={'20px'}>
                You don’t have created any payment links yet
              </Typography>
              <Button
                variant='contained'
                sx={{
                  background: '#e93a7d',
                  borderRadius: '28px',
                  marginBottom: '20px',
                  '&:hover': {
                    background: '#e93a7d',
                  },
                }}
                onClick={() => navigate('/create-payment-link')}
              >
                Create New Payment Link
              </Button>
            </Box>
          </Box>
        </>
      ) : loader === false && data && data?.length > 0 ? (
        <>
          <LinkBuilderTable />
        </>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default LinkBuilder
