import React from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
} from '@mui/material'

import CopyIcon from 'assets/adandonedCart/CopyIcon.svg'
import CrossIcon from 'assets/adandonedCart/cross.svg'
import tickIcon from 'assets/adandonedCart/tick.svg'
import { useMediaQuery } from '@mui/material'
const RecoveryCart = (props) => {
  const isMdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
  return (
    <Box
      bgcolor='#FFFFFF'
      boxShadow='0px 4px 8px rgba(0, 0, 0, 0.08)'
      borderRadius='10px'
      marginBottom={'30px'}
      padding='30px'
    >
      <Box
        display={isMdDown ? 'grid' : 'flex'}
        justifyContent={'space-between'}
      >
        <Box
          display={isMdDown ? 'grid' : 'flex'}
          style={{ alignItems: 'center' }}
        >
          <Box>
            <img
              src={CrossIcon}
              alt='tick icon'
              style={{ height: '40px', width: '40px', marginRight: '15px' }}
            />
          </Box>

          <Box>
            <Typography fontSize={'18px'}>
              Cart Recovery Email Not Sent
            </Typography>
            {/* <Typography fontSize={'18px'}>Cart Recovery Email Sent</Typography> */}
            {/* <Typography fontSize={'14px'}>
              A reminder email was sent to the customer on 16 Oct 2022 at 9:34
              PMs
            </Typography> */}
          </Box>
        </Box>
        {/* <Box display={isMdDown ? 'grid' : 'flex'} alignItems={'center'}>
          <img
            src={CrossIcon}
            alt='tick icon'
            style={{ height: '40px', width: '40px', marginRight: '15px' }}
          />

          <Typography fontSize={'18px'}>
            Cart Recovery Email Not Sent
          </Typography>
        </Box> */}

        {/* <Box display='flex'>
          <Typography fontSize={'14px'}>Recovery Status</Typography>
          <Typography
            fontSize={'12px'}
            textAlign={'center'}
            style={{
              background: '#FFEBCE',
              width: '120px',
              height: '24px',
              marginLeft: '10px',
              borderRadius: '50px',
              paddingTop: '3px',
            }}
          >
            Not Recoved
          </Typography>
        </Box> */}
      </Box>
      {/* <Grid container mt={'15px'}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Email'
            // value={formik.values.address}
            // onChange={formik.handleChange}
            // error={formik.touched.address && Boolean(formik.errors.address)}
            // helperText={formik.touched.address && formik.errors.address}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button
                    text='Add'
                    variant='contained'
                    style={{
                      background: '#e93a7d',
                      borderRadius: '8px',

                      fontSize: '15px',
                      fontWeight: '800',
                      textAlign: 'center',
                      width: '100px',
                      border: 'none',
                      height: '36px',
                    }}
                    type='submit'
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid> */}
      <Box mt={'15px'}>
        <TextField
          fullWidth
          label='Link'
          defaultValue={props.link}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => navigator.clipboard.writeText(props.link)}
                >
                  <img src={CopyIcon} alt='copyLink' />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  )
}

export default RecoveryCart
