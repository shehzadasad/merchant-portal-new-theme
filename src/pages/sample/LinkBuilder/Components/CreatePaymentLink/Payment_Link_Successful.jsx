import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import CopyToClipboard from 'react-copy-to-clipboard'
import clipBoardIcon from 'assets/product/clipboardIcon.svg'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import greenTick from 'assets/icon/greenTick.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { getPaymentLink } from 'redux/actions/LinkBuilder'
import QRCode from 'qrcode.react'
const Payment_Link_Successful = ({ isbutton, paymentLink }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [embededLink, setEmbededLink] = React.useState('')
  const [singleData, setSingleData] = React.useState(null)
  let { uid } = useParams()
  let { lid } = useParams()

  const getEmbeddedLink = async () => {
    const axios = require('axios')
    const config = {
      method: 'get',
      url: singleData?.url
        ? `${process.env.REACT_APP_API_URL}merchant/url-builder/generate_embedded_link?payment_link=${singleData?.url}`
        : `${process.env.REACT_APP_API_URL}merchant/url-builder/generate_embedded_link?payment_link=${paymentLink}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setEmbededLink(response.data.data)
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error('Error!')
      })
  }
  React.useEffect(() => {
    if (lid && uid) {
      dispatch(getPaymentLink(uid, lid, setSingleData))
    }
  }, [lid, uid])

  React.useEffect(() => {
    if ((paymentLink && paymentLink !== undefined) || singleData?.url) {
      getEmbeddedLink()
    }
  }, [paymentLink, singleData])
  const handleDownloadQR = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById('qr-gen')
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = paymentLink
      ? `${paymentLink}.png`
      : `${singleData?.url}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <React.Fragment>
      <Box display={'flex'} justifyContent='center'>
        <Paper
          sx={{
            width: '40vw',
            padding: 8,
            borderRadius: 2,
          }}
        >
          <Box display='flex' flexDirection='column' alignItems={'center'}>
            {isbutton === 'No' ? (
              ''
            ) : (
              <>
                <Box
                  component={'img'}
                  src={greenTick}
                  marginBottom={'10px'}
                  width='60px'
                  height='60px'
                />
                <Box>
                  <Typography fontWeight={800} sx={{ marginBottom: '30px' }}>
                    Payment Link Created Successfully
                  </Typography>
                </Box>
              </>
            )}
            <Box display={'flex'} flexDirection='column' width='100%'>
              <Box display={'flex'} justifyContent='space-between'>
                <Typography fontWeight={500}>Payment Link</Typography>
                <Box sx={{ cursor: 'pointer' }} display={'flex'}>
                  <CopyToClipboard
                    text={paymentLink || singleData?.url}
                    onCopy={() => toast.success('Payment Link Copied')}
                  >
                    <Box display='flex'>
                      <ContentCopyIcon
                        sx={{
                          color: '#EF3C89',
                          width: '18px',
                          height: '18px',
                        }}
                      />
                      <Typography
                        sx={{
                          marginLeft: '3px',
                          fontSize: '12px',
                        }}
                        color='#EF3C89'
                      >
                        Copy
                      </Typography>
                    </Box>
                  </CopyToClipboard>
                </Box>
              </Box>

              <TextField
                hiddenLabel
                fullWidth
                id='filled-hidden-label-small'
                value={paymentLink || singleData?.url}
                variant='filled'
                size='small'
                sx={{
                  border: 'none',
                  marginTop: '10px',
                  color: '#6B7280',
                  borderRadius: '4px',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  '& .MuiFilledInput-root': {
                    borderRadius: '4px',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '4px',
                  },
                  '& .MuiInputBase-input': {
                    color: '#6B7280',
                    cursor: 'not-allowed',
                  },
                  '& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after':
                    {
                      display: 'none',
                    },
                }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
              />
            </Box>

            <Box
              display={'flex'}
              flexDirection='column'
              justifyContent=''
              width='100%'
              marginTop={'40px'}
            >
              <Box
                display={'flex'}
                justifyContent='space-between'
                marginBottom={'10px'}
              >
                <Typography fontWeight={500}>Embedded Link</Typography>
                <Box sx={{ cursor: 'pointer' }} display={'flex'}>
                  <CopyToClipboard
                    text={embededLink}
                    onCopy={() => toast.success('Embedded Link Copied')}
                  >
                    <Box display='flex'>
                      <ContentCopyIcon
                        sx={{
                          color: '#EF3C89',
                          width: '18px',
                          height: '18px',
                        }}
                      />
                      <Typography
                        sx={{
                          marginLeft: '3px',
                          fontSize: '12px',
                        }}
                        color='#EF3C89'
                      >
                        Copy
                      </Typography>
                    </Box>
                  </CopyToClipboard>
                </Box>
              </Box>

              <TextareaAutosize
                fullWidth
                label='Title'
                id='title'
                name='title'
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '4px',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  color: '#6B7280',
                  cursor: 'not-allowed',
                  background: '#f1f1f1',
                  resize: 'none',
                }}
                value={embededLink}
                readOnly
                aria-label='Embedded Link'
              />

              <Box
                marginTop='40px'
                display={'flex'}
                alignItems='center'
                justifyContent={'center'}
              >
                <Box>
                  <QRCode
                    id='qr-gen'
                    value={paymentLink || singleData?.url}
                    size={200}
                    level={'H'}
                    includeMargin={true}
                  />
                </Box>

                <Typography
                  color='#ED2079'
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginLeft: '7px',
                  }}
                  onClick={handleDownloadQR}
                >
                  Download QR Code
                </Typography>
              </Box>

              <Box display={'flex'} justifyContent='center' marginTop={'30px'}>
                <Button
                  variant='contained'
                  sx={{
                    marginTop: '15px',
                    background: '#e93a7d',
                    width: '40%',
                    justifyContent: 'center',
                    paddingY: '10px',
                    '&:hover, &:focus': {
                      background: '#e93a7d',
                    },
                  }}
                  onClick={() => navigate('/link-builder')}
                  // disabled={btnLoader}
                >
                  Back to Link Builder
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  )
}

export default Payment_Link_Successful
