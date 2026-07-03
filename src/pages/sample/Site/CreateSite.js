import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Grid, Paper, Stack, TableContainer, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SharedButton from 'shared/components/SharedButton'
import SharedFormInput from 'shared/components/SharedFormInput'
import SharedSelect from 'shared/components/SharedSelect'

const CreateSite = () => {
  document.title = 'Create Site | QisstPay - Merchants'
  const userDetail = useSelector((state) => state.users.userDetail)
  const [domain, setDomain] = useState('')
  const [credentials, setCredentials] = useState({})
  const [platform, setPlatform] = useState('Wordpress')
  const navigate = useNavigate()

  function goBack() {
    navigate('/site')
  }

  const addSite = () => {
    let data = {}

    if (platform === 'Magento') {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          auth_token: credentials.auth_token,
        },
      }
    } else if (platform === 'Wordpress') {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          consumer_key: credentials.consumer_key,
          consumer_secret: credentials.consumer_secret,
        },
      }
    } else if (platform === 'BigCommerce') {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          access_token: credentials.access_token,
          store_hash: credentials.store_hash,
        },
      }
    } else if (platform === 'Shopify') {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          access_token: credentials.access_token,
        },
        admin_url: credentials.admin_url,
      }
    } else {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        platform: platform.toUpperCase(),
      }
    }

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/sites/add`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          navigate('/site')
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message)
      })
  }

  return (
    <Stack spacing={2}>
      <Grid container>
        <Grid>
          <Link to='/site'>
            <ArrowBack />
          </Link>
        </Grid>
        <Typography variant='h2' component='h3' marginLeft={3}>
          Create Site
        </Typography>
      </Grid>
      <TableContainer
        component={Paper}
        style={{ marginTop: 38, borderRadius: 10 }}
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Grid
          container
          sx={{ padding: 5, borderBottom: '1px solid #c9cdd4' }}
          alignItems={'center'}
        >
          <Grid item xs={6} md={6} lg={6} alignItems={'center'}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Website URL &nbsp;
              <span style={{ color: '#ED2079' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <SharedFormInput
              placeholder='Website URL'
              style={{ marginBottom: 0 }}
              onInputChange={(e) => setDomain(e)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: 5,
            borderBottomWidth: 1,
            borderBottom: '1px solid #c9cdd4',
          }}
          alignItems={'center'}
        >
          <Grid item xs={6} md={6} lg={6}>
            <Typography
              variant='p'
              component='p'
              fontSize={14}
              fontWeight={'bold'}
            >
              Platform &nbsp; <span style={{ color: '#ED2079' }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <SharedSelect
              options={[
                'Magento',
                'Wordpress',
                'BigCommerce',
                'Shopify',
                'Headless',
                'Custom',
              ]}
              handleChange={(e) => setPlatform(e.target.value)}
              selectedValue={platform}
            />
          </Grid>
        </Grid>
        {platform === 'Magento' ? (
          <>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Auth Token &nbsp; <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Auth Token'
                  style={{ marginBottom: 0 }}
                  handleChange={(e) =>
                    setCredentials({ ...credentials, auth_token: e })
                  }
                />
              </Grid>
            </Grid>
          </>
        ) : platform === 'BigCommerce' ? (
          <>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Client ID &nbsp; <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Client ID'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, client_id: e })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Client Secret &nbsp;{' '}
                  <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Client Secret'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, client_secret: e })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Access Token &nbsp;{' '}
                  <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Access Token'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, access_token: e })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Store Hash &nbsp; <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Store Hash'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, store_hash: e })
                  }
                />
              </Grid>
            </Grid>
          </>
        ) : platform === 'Shopify' ? (
          <>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Access Token &nbsp;{' '}
                  <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Access Token'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, access_token: e })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Admin Url &nbsp; <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Admin Url'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, admin_url: e })
                  }
                />
              </Grid>
            </Grid>
          </>
        ) : platform === 'Wordpress' ? (
          <>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Consumer Key &nbsp;{' '}
                  <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Consumer Key'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, consumer_key: e })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: 5,
                borderBottomWidth: 1,
                borderBottom: '1px solid #c9cdd4',
              }}
              alignItems={'center'}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Typography
                  variant='p'
                  component='p'
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  Consumer Secret &nbsp;{' '}
                  <span style={{ color: '#ED2079' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <SharedFormInput
                  placeholder='Consumer Secret'
                  style={{ marginBottom: 0 }}
                  onInputChange={(e) =>
                    setCredentials({ ...credentials, consumer_secret: e })
                  }
                />
              </Grid>
            </Grid>
          </>
        ) : (
          ''
        )}
      </TableContainer>
      <Grid
        container
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Grid item>
          <Typography
            onClick={goBack}
            variant='h3'
            component='h3'
            marginRight={3}
            style={{
              cursor: 'pointer',
            }}
          >
            Cancel
          </Typography>
        </Grid>
        <Grid item>
          <SharedButton
            text='Create Site'
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
            onClick={addSite}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default CreateSite
