import { ArrowBack } from '@mui/icons-material'
import { Grid, Paper, Stack, TableContainer, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SharedButton from 'shared/components/SharedButton'
import SharedFormInput from 'shared/components/SharedFormInput'
import SharedSelect from 'shared/components/SharedSelect'

const EditSite = () => {
  document.title = 'Update Site | QisstPay - Merchants'
  const { id } = useParams()
  const navigate = useNavigate()
  const userDetail = useSelector((state) => state.users.userDetail)
  const [domain, setDomain] = useState('')
  const [credentials, setCredentials] = useState({})
  const [AdminUrl, setAdminUrl] = useState('')
  const [platform, setPlatform] = useState('Wordpress')

  function goBack() {
    navigate('/site')
  }

  const updateSite = () => {
    let data = {}

    if (platform.toLowerCase() === 'magento') {
      data = {
        merchant_user_id: userDetail.id,
        merchant_site_id: id,
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          auth_token: credentials.auth_token,
        },
      }
    } else if (platform.toLowerCase() === 'wordpress') {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        merchant_site_id: id,
        platform: platform.toUpperCase(),
        credentials: {
          consumer_key: credentials.consumer_key,
          consumer_secret: credentials.consumer_secret,
        },
      }
    } else if (platform.toLowerCase() === 'bigcommerce') {
      data = {
        merchant_user_id: userDetail.id,
        domain: domain,
        merchant_site_id: parseInt(id),
        platform: platform.toUpperCase(),
        credentials: {
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          access_token: credentials.access_token,
          store_hash: credentials.store_hash,
        },
      }
    } else if (platform.toLowerCase() === 'shopify') {
      data = {
        merchant_user_id: userDetail.id,
        merchant_site_id: parseInt(id),
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          access_token: credentials.access_token,
        },
        admin_url: AdminUrl,
      }
    } else if (platform.toLowerCase() === 'headless') {
      data = {
        merchant_user_id: userDetail.id,
        merchant_site_id: parseInt(id),
        domain: domain,
        platform: platform.toUpperCase(),
        credentials: {
          access_token: credentials.access_token,
        },
        admin_url: AdminUrl,
      }
    } else {
      data = {
        merchant_user_id: userDetail.id,
        merchant_site_id: parseInt(id),
        domain: domain,
        platform: platform.toUpperCase(),
      }
    }

    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}merchant/sites/update`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        toast.success('Updated Successfully')
        return navigate('/site')
      })
      .catch(function (error) {
        toast.error(error.response.data.message)
      })
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('updateSiteDetails'))
    setDomain(data.domain)
    setPlatform(data.platform.toLowerCase())
    setCredentials(data.credentials)
    setAdminUrl(data.adminUrl)
  }, [])

  return (
    <Stack spacing={2}>
      <Grid container>
        <Grid>
          <Link to='/site'>
            <ArrowBack />
          </Link>
        </Grid>
        <Typography variant='h2' component='h3' marginLeft={3}>
          Update Site: {id}
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
              value={domain}
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
                'Bigcommerce',
                'Shopify',
                'Headless',
                'Custom',
              ]}
              handleChange={(e) => setPlatform(e.target.value)}
              selectedValue={
                platform.charAt(0).toUpperCase() + platform.slice(1)
              }
            />
          </Grid>
        </Grid>
        {platform.toLowerCase() === 'magento' ? (
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
                  value={credentials.auth_token}
                />
              </Grid>
            </Grid>
          </>
        ) : platform.toLowerCase() === 'bigcommerce' ? (
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
                  value={credentials.client_id}
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
                  value={credentials.client_secret}
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
                  value={credentials.access_token}
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
                  value={credentials.store_hash}
                />
              </Grid>
            </Grid>
          </>
        ) : platform.toLowerCase() === 'shopify' ? (
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
                  value={credentials.access_token}
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
                  onInputChange={(e) => setAdminUrl(e)}
                  value={AdminUrl}
                />
              </Grid>
            </Grid>
          </>
        ) : platform.toLowerCase() === 'wordpress' ? (
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
                  value={credentials.consumer_key}
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
                  value={credentials.consumer_secret}
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
          <SharedButton
            onClick={goBack}
            text='Cancel'
            style={{
              background: 'white',
              border: '1px solid #e93a7d',
              borderRadius: 10,
              color: '#e93a7d',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: 150,
              height: 40,
              cursor: 'pointer',
              marginRight: 10,
            }}
          />
        </Grid>
        <Grid item>
          <SharedButton
            text='Update Site'
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
            onClick={updateSite}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default EditSite
