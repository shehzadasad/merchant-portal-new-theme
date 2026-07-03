import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { pink } from '@mui/material/colors'
import { useState } from 'react'
import SharedFormInput from 'shared/components/SharedFormInput'

const FreeShippingUpdate = ({
  checked,
  setChecked,
  setIsFSByWeight,
  setIsFSByPrice,
  setMinimumPrice,
  setMinimumWeight,
  minimumPrice,
  minimumWeight,
  isFSByWeight,
  isFSByPrice,
}) => {
  const [rateByPrice, setRateByPrice] = useState(isFSByPrice)
  const [rateByWeight, setRateByWeight] = useState(isFSByWeight)

  return (
    <Paper
      sx={{
        width: window.innerWidth > 700 ? '50vw' : '80vw',
        padding: 5,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 2,
      }}
    >
      <Grid container alignItems={'center'}>
        <Grid item xs={1} md={1} lg={1}>
          <Checkbox
            aria-label='CheckBox Demo'
            checked={checked}
            onChange={() => setChecked(!checked)}
            sx={{
              '&.Mui-checked': {
                color: pink[600],
              },
              paddingLeft: 0,
              paddingRight: 0,
            }}
          />
        </Grid>
        <Grid
          item
          lg={11}
          sx={(theme) => ({
            [theme.breakpoints.down('lg')]: {
              marginLeft: 3,
            },
          })}
        >
          <Grid container direction={'row'} alignItems={'center'}>
            <Grid item lg={7}>
              <Typography
                variant='p'
                component='p'
                fontSize={16}
                fontWeight={500}
                style={{ marginLeft: -15 }}
              >
                Free Shipping
              </Typography>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Typography
                variant={'p'}
                component={'p'}
                style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 10,
                  marginLeft: 3,
                  fontStyle: 'italic',
                }}
              >
                Customers will see this at checkout
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {typeof minimumPrice !== 'undefined' ? (
        <Grid container>
          <FormControl>
            <FormLabel
              id='condition-radio-group'
              style={{
                color: '#6B7280',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 14,
              }}
            >
              CONDITION
            </FormLabel>
            <RadioGroup
              aria-labelledby='condition-radio-group'
              defaultValue='rateByPrice'
              name='radio-buttons-group'
            >
              <FormControlLabel
                value='rateByPrice'
                checked={isFSByPrice}
                onClick={(e) => {
                  if (e.target.checked === true) {
                    setRateByPrice(true)
                    setRateByWeight(false)
                    setIsFSByPrice(true)
                    setIsFSByWeight(false)
                  }
                }}
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="Based on order's price"
              />
              {/* <FormControlLabel
                value='rateByWeight'
                checked={isFSByWeight}
                onClick={(e) => {
                  if (e.target.checked === true) {
                    setRateByWeight(true)
                    setRateByPrice(false)
                    setIsFSByPrice(false)
                    setIsFSByWeight(true)
                  }
                }}
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="Based on order's weight"
              /> */}
            </RadioGroup>

            {isFSByPrice === true ? (
              <Grid container marginTop={5}>
                <Grid item xs={12} sm={12} md={5} lg={5} marginRight={2}>
                  <SharedFormInput
                    placeholder='100'
                    type='number'
                    label='Min. Price'
                    style={{ marginBottom: 0 }}
                    value={minimumPrice}
                    onInputChange={(e) => setMinimumPrice(e)}
                  />
                </Grid>
                <Grid item>
                  <SharedFormInput
                    placeholder='∞'
                    label='Max. Price (∞)'
                    disabled={true}
                    style={{ marginBottom: 0 }}
                  />
                </Grid>
              </Grid>
            ) : isFSByWeight === true ? (
              <Grid container marginTop={5}>
                <Grid item xs={12} sm={12} md={5} lg={5} marginRight={2}>
                  <SharedFormInput
                    placeholder='100'
                    type='number'
                    label='Min. Weight (kg)'
                    style={{ marginBottom: 0 }}
                    value={minimumWeight}
                    onInputChange={(e) => setMinimumWeight(e)}
                  />
                </Grid>
                <Grid item>
                  <SharedFormInput
                    placeholder='∞'
                    label='Max. Weight (kg) (∞)'
                    disabled={true}
                    style={{ marginBottom: 0 }}
                  />
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </FormControl>
        </Grid>
      ) : (
        ''
      )}
    </Paper>
  )
}

export default FreeShippingUpdate
