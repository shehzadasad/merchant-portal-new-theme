import axios from 'axios'
import React, { useState } from 'react'
import { Box, Typography, IconButton, Modal, Button } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import applicationSuccess from 'assets/qp-mall/applicationSuccess.svg'
const SellingModal = ({ handleCls, openSelling, title, id }) => {
  const [apply, setApply] = useState(false)

  const handleClose = () => {
    handleCls(false)
  }

  const handleChangeMallStatus = () => {
    const status = title === 'Cancel Selling' ? 'CANCELLED' : 'PAUSED'
    if (title === 'Withdraw Request') {
      var config1 = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/mall/requests/withdraw?request_id=${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config1)
        .then(function (response) {
          setApply(true)
          toast.success(response.data.message)
          handleCls(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      var config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}merchant/mall/change-status?mall_id=${id}&new_status=${status}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      axios(config)
        .then(function (response) {
          setApply(true)
          toast.success(response.data.message)
          handleCls(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  return (
    <>
      <Modal
        open={openSelling}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: window.innerWidth < 600 ? '90vw' : 500,
            background: '#fff',
            border: 'none',
            boxShadow: 24,
            p: 4,
            borderRadius: '16px',
            padding: 20,
          }}
        >
          <>
            <Box display={'flex'} justifyContent='space-between'>
              <Typography
                id='modal-modal-title'
                variant='p'
                component='p'
                fontSize={18}
                fontWeight={'bold'}
              >
                {title}
              </Typography>
              <IconButton onClick={handleClose}>
                {' '}
                <Close />
              </IconButton>
            </Box>

            <Typography fontSize={'14px'} color={'#6B7280'}>
              Are you sure you want to {title} on Askari Mall?
            </Typography>

            <Box display='flex' justifyContent={'end'}>
              <SharedButton
                text='Cancel'
                variant='outlined'
                style={{
                  color: '#e93a7d',
                  borderRadius: '8px',
                  background: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  textAlign: 'center',
                  width: '100px',
                  border: '1px solid #e93a7d',
                  height: '36px',
                  cursor: 'pointer',
                  marginRight: 17,
                  marginTop: 20,
                }}
                onClick={handleClose}
              />
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

                  marginRight: 17,
                  marginTop: 20,
                }}
                onClick={() => handleChangeMallStatus()}
              >
                Yes
              </Button>
            </Box>
          </>
          {/* ) : (
            <Box
              display={'flex'}
              flexDirection='column'
              justifyContent={'center'}
              alignItems='center'
            >
              <img src={applicationSuccess} />
              <Typography marginBottom={'12px'} fontSize='20px'>
                Application Submitted Succesfully
              </Typography>
              <Typography textAlign={'center'} sx={{ width: '85%' }}>
                We will notify you once the mall admin accept/reject your
                selling application
              </Typography>
              <Box marginTop='20px'>
                <Button
                  variant='outlined'
                  sx={{
                    border: '1px solid #e93a7d',
                    borderRadius: '4px',
                    color: '#e93a7d',
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )} */}
        </Box>
      </Modal>
    </>
  )
}

export default SellingModal
