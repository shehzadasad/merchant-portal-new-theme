import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  TextField,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import SharedButton from 'shared/components/SharedButton'
import { useState } from 'react'
import { toast } from 'react-toastify'
const AddReasonModal = ({ open, handleCls, addReason }) => {
  const [reason, setReason] = useState('')
  const handleChange = (e) => {
    setReason(e.target.value)
  }
  const handleAddReason = () => {
    if (!reason) {
      toast.error('Add reason')
    } else {
      addReason({ reason, isActive: true, id: null })
      handleCls()
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleCls}
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
        <Box display={'flex'} justifyContent='space-between'>
          <Typography
            id='modal-modal-title'
            variant='p'
            component='p'
            fontSize={20}
            fontWeight={'bold'}
          >
            Add Reason
          </Typography>

          <IconButton onClick={handleCls}>
            {' '}
            <Close />
          </IconButton>
        </Box>

        <Box>
          <TextField
            fullWidth
            id='reason'
            name='reason'
            label='Reason*'
            variant='outlined'
            value={reason}
            onChange={handleChange}
            placeholder="I don't like this"
          />
        </Box>
        <Box mt={'35px'}></Box>
        <Box mt={'15px'}></Box>

        <Box display='flex' justifyContent={'end'}>
          <SharedButton
            text='Cancel'
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
            onClick={handleCls}
          />
          <Button
            variant='outlined'
            style={{
              background: '#e93a7d',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '800',
              textAlign: 'center',
              width: '100px',
              border: 'none',
              height: '36px',
              cursor: 'pointer',
              marginRight: 17,
              marginTop: 20,
            }}
            onClick={handleAddReason}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddReasonModal
