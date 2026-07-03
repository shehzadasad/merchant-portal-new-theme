import { Grid, Typography } from '@mui/material'
import SharedButton from 'shared/components/SharedButton'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { useState } from 'react'
import SharedFormInput from 'shared/components/SharedFormInput'
import { toast } from 'react-toastify';

const StackBuilderTopRow = ({
  setStackName,
  StackName,
  addStack,
  disabled,
}) => {
  const [open, setOpen] = useState(false)
  
  const handleOpen = () => setOpen(true)
  
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35vw',
    bgcolor: 'background.paper',
    borderRadius: '2px',
    boxShadow: 24,
    p: 6,
  }

  return (
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
          Stacks
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item>
            <SharedButton
              disable={disabled}
              text='+ Add New'
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
                cursor: `${disabled === true ? 'not-allowed' : 'pointer'}`,

                marginRight: 10,
                opacity: `${disabled === true ? '0.8' : '1'}`,
              }}
              onClick={handleOpen}
            />
          </Grid>
        </Grid>
      </Grid>

      {/*Add Stack Modal*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <SharedFormInput
            label='Stack Name'
            onInputChange={(e) => {
              setStackName(e)
            }}
            value={StackName}
            style={{
              marginBottom: 0,
              height: 250,
            }}
            multiline={true}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10pt',
            }}
          >
            <SharedButton
              text='Cancel'
              style={{
                background: '#b0bec5',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '45%',
                border: 'none',
                height: 40,
                cursor: 'pointer',
                marginRight: 10,
              }}
              onClick={handleClose}
            />

            <SharedButton
              text='Add New'
              style={{
                background: '#e93a7d',
                borderRadius: 50,
                color: '#fff',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '45%',
                border: 'none',
                height: 40,
                cursor: 'pointer',
                marginRight: 10,
              }}
              onClick={() => {
                if (StackName){
                  handleClose()
                  addStack()
                }
                else {
                  toast.error('Add Stack Name')
                  handleClose()
                }
                
              }}
            />
          </div>
        </Box>
      </Modal>
    </Grid>
  )
}
export default StackBuilderTopRow
