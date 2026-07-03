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
import { useEffect, useState } from 'react'
import SharedFormInput from 'shared/components/SharedFormInput'
import TrashIcon from 'assets/icon/TrashIcon.svg'

let count = 0

const StandardShippingUpdate = (props) => {
  const { data, isStandartShipping, setIsStandardShipping } = props
  // const [checked, setChecked] = useState(true)
  const [rateByPrice, setRateByPrice] = useState(false)
  const [rateByWeight, setRateByWeight] = useState(false)

  const [inputFieldsByPrice, setInputFieldsByPrice] = useState([
    {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'PRICE',
    },
  ])
  const handleFormChangeByPriceMinAmount = (event, index) => {
    let data = [...inputFieldsByPrice]
    data[index].minAmount = event
    setInputFieldsByPrice(data)
  }
  const handleFormChangeByPriceMaxAmount = (event, index) => {
    let data = [...inputFieldsByPrice]
    data[index].maxAmount = event
    setInputFieldsByPrice(data)
  }
  const handleFormChangeByPriceFlatShipping = (event, index) => {
    let data = [...inputFieldsByPrice]
    data[index].shippingFlatFee = event
    setInputFieldsByPrice(data)
  }
  const addFieldsByPrice = () => {
    let object = {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'PRICE',
    }

    setInputFieldsByPrice([...inputFieldsByPrice, object])
  }
  const removeFieldsByPrice = (index) => {
    let data = [...inputFieldsByPrice]
    data.splice(index, 1)
    setInputFieldsByPrice(data)
  }

  const [inputFieldsByWeight, setInputFieldsByWeight] = useState([
    {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'WEIGHT',
    },
  ])
  const handleFormChangeByWeightMinAmount = (event, index) => {
    let data = [...inputFieldsByWeight]
    data[index].minAmount = event
    setInputFieldsByWeight(data)
  }
  const handleFormChangeByWeightMaxAmount = (event, index) => {
    let data = [...inputFieldsByWeight]
    data[index].maxAmount = event
    setInputFieldsByWeight(data)
  }
  const handleFormChangeByWeightFlatShipping = (event, index) => {
    let data = [...inputFieldsByWeight]
    data[index].shippingFlatFee = event
    setInputFieldsByWeight(data)
  }
  const addFieldsByWeight = () => {
    let object = {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'WEIGHT',
    }

    setInputFieldsByWeight([...inputFieldsByWeight, object])
  }
  const removeFieldsByWeight = (index) => {
    let data = [...inputFieldsByWeight]
    data.splice(index, 1)
    setInputFieldsByWeight(data)
  }

  useEffect(() => {
    props.onChange(inputFieldsByWeight)
  }, [inputFieldsByWeight])

  useEffect(() => {
    props.onChange(inputFieldsByPrice)
  }, [inputFieldsByPrice])

  useEffect(() => {
    if (count < 2) {
      const temp = data
      const tempData = temp.filter((rule) => rule.maxAmount !== 0)

      if (tempData.length < 1) {
        setIsStandardShipping(false)
        return
      } else {
        setIsStandardShipping(true)
      }

      data.map((rule) => {
        if (rule?.basedOn === 'PRICE') {
          setInputFieldsByPrice(
            tempData.length > 0
              ? tempData
              : [
                  {
                    shippingFlatFee: 0,
                    minAmount: 0,
                    maxAmount: 0,
                    basedOn: 'PRICE',
                  },
                ]
          )
          setRateByPrice(true)
          setRateByWeight(false)
          return
        } else {
          setInputFieldsByWeight(
            tempData.length > 0
              ? tempData
              : [
                  {
                    shippingFlatFee: 0,
                    minAmount: 0,
                    maxAmount: 0,
                    basedOn: 'WEIGHT',
                  },
                ]
          )
          setRateByWeight(true)
          setRateByPrice(false)
          return
        }
      })
      count = count + 1
    }
  }, [data])

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
            checked={isStandartShipping}
            onChange={() => setIsStandardShipping(!isStandartShipping)}
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
                Standard Shipping
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
      {isStandartShipping === true ? (
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
                checked={rateByPrice}
                onClick={(e) => {
                  if (e.target.checked === true) {
                    setRateByPrice(true)
                    setRateByWeight(false)
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
                checked={rateByWeight}
                onClick={(e) => {
                  if (e.target.checked === true) {
                    setRateByWeight(true)
                    setRateByPrice(false)
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

            {rateByPrice === true ? (
              <>
                {inputFieldsByPrice.map((form, index) => (
                  <Grid
                    container
                    marginTop={5}
                    key={index}
                    alignItems={'center'}
                  >
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='0'
                        type='number'
                        label='Min. Price'
                        style={{ marginBottom: 0 }}
                        value={form.minAmount}
                        onInputChange={(e) =>
                          handleFormChangeByPriceMinAmount(e, index)
                        }
                      />
                    </Grid>
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='100'
                        label='Max. Price'
                        style={{ marginBottom: 0 }}
                        value={form.maxAmount}
                        type='number'
                        onInputChange={(e) =>
                          handleFormChangeByPriceMaxAmount(e, index)
                        }
                      />
                    </Grid>
                    <Grid item>
                      <SharedFormInput
                        placeholder='100'
                        label='Shipping Cost'
                        style={{ marginBottom: 0 }}
                        value={form.shippingFlatFee}
                        onInputChange={(e) =>
                          handleFormChangeByPriceFlatShipping(e, index)
                        }
                        type='number'
                      />
                    </Grid>
                    {index + 1 === inputFieldsByPrice.length &&
                    index + 1 !== 1 ? (
                      <Grid item>
                        <img
                          src={TrashIcon}
                          alt='Trash Gray Icon'
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          onClick={() => removeFieldsByPrice(index)}
                        />
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                ))}
                <Typography
                  variant='p'
                  component='p'
                  fontSize={16}
                  fontWeight={600}
                  color={'#ED2079'}
                  marginTop={5}
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => addFieldsByPrice()}
                >
                  Add New
                </Typography>
              </>
            ) : rateByWeight === true ? (
              <>
                {inputFieldsByWeight.map((form, index) => (
                  <Grid
                    container
                    marginTop={5}
                    key={index}
                    alignItems={'center'}
                  >
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='0'
                        type='number'
                        label='Min. Weight (kg)'
                        style={{ marginBottom: 0 }}
                        value={form.minAmount}
                        onInputChange={(e) =>
                          handleFormChangeByWeightMinAmount(e, index)
                        }
                      />
                    </Grid>
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='100'
                        label='Max. Weight (kg)'
                        style={{ marginBottom: 0 }}
                        value={form.maxAmount}
                        onInputChange={(e) =>
                          handleFormChangeByWeightMaxAmount(e, index)
                        }
                        type='number'
                      />
                    </Grid>
                    <Grid item>
                      <SharedFormInput
                        placeholder='100'
                        label='Shipping Cost'
                        style={{ marginBottom: 0 }}
                        value={form.shippingFlatFee}
                        onInputChange={(e) =>
                          handleFormChangeByWeightFlatShipping(e, index)
                        }
                        type='number'
                      />
                    </Grid>
                    {index + 1 === inputFieldsByWeight.length &&
                    index + 1 !== 1 ? (
                      <Grid item>
                        <img
                          src={TrashIcon}
                          alt='Trash Gray Icon'
                          style={{ marginLeft: 10, cursor: 'pointer' }}
                          onClick={() => {
                            removeFieldsByWeight(index)
                          }}
                        />
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                ))}
                <Typography
                  variant='p'
                  component='p'
                  fontSize={16}
                  fontWeight={600}
                  color={'#ED2079'}
                  marginTop={5}
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => addFieldsByWeight()}
                >
                  Add New
                </Typography>
              </>
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

export default StandardShippingUpdate
