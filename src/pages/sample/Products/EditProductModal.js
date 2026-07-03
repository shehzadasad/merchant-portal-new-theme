import { Container, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import SharedButton from 'shared/components/SharedButton'
import SharedFormInput from 'shared/components/SharedFormInput'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 600 ? '90vw' : '500px',
  height: '300px',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
}

const EditProductModal = (props) => {
  const { open, setOpen } = props
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid container alignItems={'center'} marginBottom='5px'>
            <Grid item xs={11} md={11} lg={11}>
              <Typography
                id='modal-modal-title'
                variant='p'
                component='p'
                fontSize={18}
                fontWeight={500}
                color='#111827'
              >
                Edit Inventory
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                id='modal-modal-title'
                variant='p'
                component='p'
                fontSize={16}
                style={{ cursor: 'pointer' }}
                onClick={handleClose}
              >
                X
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ display: 'flex' }}>
            <Grid item>
              <Typography
                sx={{ mt: 4, fontSize: 14, fontWeight: '400' }}
                color={'#6B7280'}
              >
                Variation Type:
              </Typography>
            </Grid>
            <Grid item style={{ marginLeft: 5 }}>
              <Typography
                sx={{ mt: 4, fontSize: 14, fontWeight: '500' }}
                color={'#111827'}
              >
                SIZE {'>'} SMALL
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{ mt: 4, fontSize: 14, fontWeight: '400' }}
            color={'#111827'}
          >
            Please enter the quantity you want to add.
          </Typography>
          <Container style={{ marginTop: 20, marginLeft: -10 }}>
            <SharedFormInput
              label='Quantity *'
              type='number'
              onInputChange={(e) => console.log(e)}
              style={{ marginBottom: 0 }}
            />
          </Container>
          <Container sx={{ mt: 7 }}>
            <Grid
              container
              style={{
                justifyContent: 'flex-end',
                marginLeft: -7,
              }}
            >
              <Grid item>
                <SharedButton
                  text='Cancel'
                  style={{
                    background: 'white',
                    border: '1px solid #e93a7d',
                    borderRadius: 10,
                    color: '#e93a7d',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 120,
                    height: 40,
                    cursor: 'pointer',
                  }}
                  onClick={handleClose}
                />
              </Grid>
              <Grid item>
                <SharedButton
                  text='Add Inventory'
                  style={{
                    background: '#e93a7d',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    textAlign: 'center',
                    width: 150,
                    border: 'none',
                    height: 40,
                    cursor: 'pointer',
                    marginLeft: 15,
                  }}
                  onClick={handleClose}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </div>
  )
}

export default EditProductModal
