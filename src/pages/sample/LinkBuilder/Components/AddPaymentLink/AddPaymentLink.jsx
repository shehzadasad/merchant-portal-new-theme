import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import TextEditor from '../../../Returns/TextEditor'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import Uploadimg from 'assets/img/uploadimg.svg'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteIcon from '@mui/icons-material/Delete'
import { ThreeDots } from 'react-loader-spinner'
import Divider from '@mui/material/Divider'

const AddPaymentLink = () => {
  const [Images, setImages] = React.useState([])

  const [btnLoader, setBtnLoader] = React.useState(false)
  const inputElement = React.useRef(null)

  const deleteProductImage = (index) => {
    let pImages = [...Images]
    pImages.splice(index, 1)

    setImages(pImages)
  }
  const handleFileUpload = (event) => {
    getBase64(event.target.files[0], event)
  }
  const getBase64 = (file, e) => {
    return new Promise((resolve) => {
      let fileInfo
      let baseURL = ''
      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result

        let arr = [...Images]
        var strImage = baseURL.replace(/^data:image\/[a-z]+;base64,/, '')

        arr.push({ name: file.name, base64: strImage.toString() })
        setImages(arr)

        resolve(baseURL)
      }
      e.target.value = null
    })
  }
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ]

  const [personName, setPersonName] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction='column'
        sx={{
          minHeight: '100vh',
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item>
          {/* New product */}
          <Typography variant='h2' component='h2'>
            Add New Product 2 number
          </Typography>

          <Paper
            sx={{
              width: window.innerWidth > 700 ? '50vw' : '80vw',
              marginTop: '35px',
              paddingY: 12,
              paddingX: 6,
              borderRadius: 2,
            }}
          >
            <Stack spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id='title'
                  name='title'
                  label='Title*'
                  variant='outlined'
                  //   value={formik.values.title || ''}
                  //   onChange={formik.handleChange}
                  //   error={
                  //     formik.touched.title && Boolean(formik.errors.title)
                  //   }
                  //   helperText={formik.touched.title && formik.errors.title}
                  placeholder='Returns and Refunds Policy '
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    labelId='demo-simple-select-label'
                    id='timeUnit'
                    label='Time Unit'
                    //   value={formik.values.timeUnit || ''}
                    //   onChange={formik.handleChange}
                    //   name='timeUnit'
                    //   error={
                    //     formik.touched.timeUnit &&
                    //     Boolean(formik.errors.timeUnit)
                    //   }
                    //   helperText={
                    //     formik.touched.timeUnit && formik.errors.timeUnit
                    //   }
                  >
                    <MenuItem value={'Days'}>Days</MenuItem>
                    <MenuItem value={'Week'}>Week</MenuItem>
                    <MenuItem value={'Month'}> Month</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextEditor
                // descriptionVal={refundData?.description}
                // setDescriptionVal={setDescriptionVal}
                />
              </Grid>
            </Stack>
          </Paper>
          {/* Product Image*/}
          <Typography variant='h2' component='h2' marginTop={10}>
            Product Image
          </Typography>
          <Paper
            sx={{
              paddingY: 12,
              paddingX: 6,
              marginTop: '35px',
              borderRadius: 2,
            }}
          >
            <Stack spacing={5}>
              <Box
                sx={{
                  overflowX: 'auto',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                  }}
                >
                  {Images.map((items, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: '75pt',
                          height: '75pt',
                          marginRight: '20pt',
                        }}
                      >
                        <Box
                          color='secondary'
                          variant='contained'
                          component='img'
                          src={'data:image/jpeg;base64, ' + items.base64}
                          width='100%'
                          height='100%'
                          borderRadius='7px'
                          marginRight='10pt'
                          alt='img'
                        />
                        <Box
                          src={TrashIcon}
                          alt='Trash Icon'
                          component='img'
                          bgcolor={'#fff'}
                          width='15pt'
                          height='15pt'
                          sx={{
                            position: 'absolute',
                            right: '8pt',
                            bottom: '8pt',
                            padding: '2pt',
                            cursor: 'pointer',
                            borderRadius: '2pt',
                          }}
                          onClick={() => deleteProductImage(index)}
                        />
                      </Box>
                    )
                  })}
                  <input
                    ref={inputElement}
                    onChange={handleFileUpload}
                    type='file'
                    style={{ display: 'none' }}
                    // multiple={false}
                  />
                  <Box>
                    <Box
                      color='secondary'
                      variant='contained'
                      component='img'
                      src={Uploadimg}
                      width='75pt'
                      height='75pt'
                      sx={{
                        cursor: 'pointer',
                      }}
                      onClick={() => inputElement.current.click()}
                      alt='img'
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Paper>
          {/* Variants*/}
          <Typography variant='h2' component='h2' marginTop={10}>
            Variants
          </Typography>
          <Paper
            sx={{
              paddingY: 12,
              paddingX: 6,
              marginTop: '35px',
              borderRadius: 2,
            }}
          >
            <Grid
              container
              sx={{ display: 'flex', alignItems: 'center' }}
              spacing={1}
            >
              <Grid item sx={12} md={2} textAlign='center' marginRight={'8px'}>
                <Typography color='#6B7280' sx={{ marginBottom: '10px' }}>
                  No of Attributes
                </Typography>
                <Typography>01</Typography>
              </Grid>
              <Grid item sx={12} md={2}>
                <FormControl sx={{ m: 1, width: 90 }}>
                  <InputLabel id='demo-multiple-name-label'>Name</InputLabel>
                  <Select
                    labelId='demo-multiple-name-label'
                    id='demo-multiple-name'
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label='Name' />}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={12} md={'6'}>
                <FormControl sx={{ m: 1, width: 320 }}>
                  <InputLabel id='demo-multiple-name-label' fullWidth>
                    Options
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId='demo-multiple-name-label'
                    id='demo-multiple-name'
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label='Options' />}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={12} md={1}>
                <DeleteIcon sx={{ cursor: 'pointer' }} />
              </Grid>
            </Grid>
          </Paper>
          {/* Variants Detail*/}
          <Typography variant='h2' component='h2' marginTop={10}>
            Variation Details
          </Typography>
          <Paper
            sx={{
              paddingBottom: 12,
              paddingTop: 6,
              paddingX: 6,
              marginTop: '35px',
              borderRadius: 2,
            }}
          >
            <Typography>Variation Type</Typography>

            <Grid item sx={12} marginY={'20px'}>
              <Button
                variant='outlined'
                sx={{
                  borderRadius: '4px',
                  color: '#000',
                  border: '1px solid #E7E9EB',
                  marginRight: '10px',
                }}
                // onClick={handleClose}
              >
                All
              </Button>
              <Button
                variant='outlined'
                sx={{
                  borderRadius: '4px',

                  marginRight: '10px',
                  color: '#000',
                  border: '1px solid #E7E9EB',
                }}
                // onClick={handleClose}
              >
                Size
              </Button>
              <Button
                variant='outlined'
                sx={{
                  borderRadius: '4px',
                  color: '#000',
                  border: '1px solid #E7E9EB',
                  marginRight: '10px',
                }}
                // onClick={handleClose}
              >
                Color
              </Button>
            </Grid>
            <Grid item sx={12}>
              <Box
                padding='10px'
                bgcolor='#E7E9EB'
                opacity='0.2'
                borderRadius='6px'
                display='flex'
                justifyContent={'space-between'}
              >
                <Typography> Options</Typography>
                <Typography>
                  {' '}
                  Details (Add price and quantity against each option)
                </Typography>
              </Box>
            </Grid>
            <Box marginTop={'8px'} display='flex'>
              <Box
                display='flex'
                alignItems={'center'}
                justifyContent='space-between'
              >
                <Box
                  component={'img'}
                  src='./assets/images/UrlBuilder/shirt-img.png'
                  marginRight={'10px'}
                />
                <Typography>Small/Green</Typography>
              </Box>
              <Grid
                container
                spacing={2}
                display='flex'
                justifyContent={'flex-end'}
              >
                <Grid item xs={3}>
                  <TextField
                    // placeholder='100'
                    type='text'
                    label='Title'

                    // value={title}
                    // onInputChange={(e) => setTitle(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='100'
                    type='number'
                    label='Min. Price'

                    // value={minimumPrice}
                    // onInputChange={(e) => setMinimumPrice(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='∞'
                    label='Max. Price (∞)'
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ margin: '20px 0px' }} />
            <Box marginTop={'8px'} display='flex'>
              <Box
                display='flex'
                alignItems={'center'}
                justifyContent='space-between'
              >
                <Box
                  component={'img'}
                  src='./assets/images/UrlBuilder/shirt-img.png'
                  marginRight={'10px'}
                />
                <Typography>Small/Green</Typography>
              </Box>
              <Grid
                container
                spacing={2}
                display='flex'
                justifyContent={'flex-end'}
              >
                <Grid item xs={3}>
                  <TextField
                    // placeholder='100'
                    type='text'
                    label='Title'

                    // value={title}
                    // onInputChange={(e) => setTitle(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='100'
                    type='number'
                    label='Min. Price'

                    // value={minimumPrice}
                    // onInputChange={(e) => setMinimumPrice(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='∞'
                    label='Max. Price (∞)'
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ margin: '20px 0px' }} />
            <Box marginTop={'8px'} display='flex'>
              <Box
                display='flex'
                alignItems={'center'}
                justifyContent='space-between'
              >
                <Box
                  component={'img'}
                  src='./assets/images/UrlBuilder/shirt-img.png'
                  marginRight={'10px'}
                />
                <Typography>Small/Green</Typography>
              </Box>
              <Grid
                container
                spacing={2}
                display='flex'
                justifyContent={'flex-end'}
              >
                <Grid item xs={3}>
                  <TextField
                    // placeholder='100'
                    type='text'
                    label='Title'

                    // value={title}
                    // onInputChange={(e) => setTitle(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='100'
                    type='number'
                    label='Min. Price'

                    // value={minimumPrice}
                    // onInputChange={(e) => setMinimumPrice(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='∞'
                    label='Max. Price (∞)'
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ margin: '20px 0px' }} />
            <Box marginTop={'8px'} display='flex'>
              <Box
                display='flex'
                alignItems={'center'}
                justifyContent='space-between'
              >
                <Box
                  component={'img'}
                  src='./assets/images/UrlBuilder/shirt-img.png'
                  marginRight={'10px'}
                />
                <Typography>Small/Green</Typography>
              </Box>
              <Grid
                container
                spacing={2}
                display='flex'
                justifyContent={'flex-end'}
              >
                <Grid item xs={3}>
                  <TextField
                    // placeholder='100'
                    type='text'
                    label='Title'

                    // value={title}
                    // onInputChange={(e) => setTitle(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='100'
                    type='number'
                    label='Min. Price'

                    // value={minimumPrice}
                    // onInputChange={(e) => setMinimumPrice(e)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    placeholder='∞'
                    label='Max. Price (∞)'
                    disabled={true}
                    sx={{ marginBottom: 0 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Grid item sx={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={'antoine'}
                  onChange={handleChange}
                  name='antoine'
                  sx={{
                    color: '#e93a7d',
                    '&.Mui-checked': {
                      color: '#e93a7d',
                    },
                  }}
                />
              }
              label='Make this Product headless'
            />
          </Grid>

          <Button
            variant='contained'
            sx={{
              marginTop: '15px',
              background: '#e93a7d',
            }}
            disabled={btnLoader}
            //   onClick={handleProductCreate}
          >
            {btnLoader === false ? (
              'Create Product'
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ThreeDots
                  height='30'
                  width='30'
                  radius='9'
                  color='white'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClassName=''
                  visible={true}
                />
              </Box>
            )}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AddPaymentLink
