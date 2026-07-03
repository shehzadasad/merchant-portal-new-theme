import axios from 'axios'
import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  Checkbox,
  FormControlLabel,
  ListItem,
  List,
} from '@mui/material'

import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import applicationSuccess from 'assets/qp-mall/applicationSuccess.svg'
const ApplyForSellingModal = ({
  handleCls,
  openModal,
  mallIds,
  setSuccess,
}) => {
  const [apply, setApply] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleClose = () => {
    handleCls(false)
  }

  const handleSellMall = () => {
    const dataObj = {
      mall_ids: typeof mallIds === 'number' ? [mallIds] : mallIds,
    }
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}merchant/mall/requests/add`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: dataObj,
    }

    axios(config)
      .then(function (response) {
        // setSuccess(true)

        setApply(true)
        toast.success(response.data.message)
        handleCls(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  return (
    <>
      <Modal
        open={openModal}
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
                Apply for Selling to QP Malls
              </Typography>
              <IconButton onClick={handleClose}>
                {' '}
                <Close />
              </IconButton>
            </Box>

            <Typography fontSize={'14px'} color={'#6B7280'}>
              Are you sure you want to start selling on selected QP malls. These
              mall will have access to following modules:
            </Typography>
            <Box paddingLeft={'12px'} marginTop='12px'>
              <List>
                <ListItem>1: Products </ListItem>
                <ListItem>2: Orders</ListItem>
                <ListItem>3: Billing</ListItem>
                <ListItem>4: KYB Score</ListItem>
              </List>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  name='gilad'
                  onChange={handleChange}
                  sx={{
                    color: '#e93a7d',
                    '&.Mui-checked': {
                      color: '#e93a7d',
                    },
                  }}
                />
              }
              label='By continuing, I agree to mall Terms and Conditions
            & Privacy Policy'
            />

            <Box display='flex' justifyContent={'end'}>
              <Button
                variant='outlined'
                style={{
                  color: '#e93a7d',
                  borderRadius: '8px',
                  background: '#fff',
                  fontSize: '15px',
                  fontWeight: '800',
                  width: '100px',
                  border: '1px solid #e93a7d',
                  height: '36px',
                  marginRight: 17,
                  marginTop: 20,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                text='Add'
                variant='contained'
                style={{
                  background: '#e93a7d',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '800',
                  width: '100px',
                  height: '36px',
                  marginRight: 17,
                  marginTop: 20,
                }}
                onClick={() => handleSellMall()}
              >
                Apply
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

export default ApplyForSellingModal
