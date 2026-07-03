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
import { toast } from 'react-toastify'

const StandardShipping = (props) => {
  const {
    isStandartShipping,
    setIsStandardShipping,
    rateByPriceStandardShipping,
    setRateByPriceStandardShipping,
    rateByWeightStandardShipping,
    setRateByWeightStandardShipping,
    title,
    setTitle,
  } = props
  const [isError, setIsError] = useState(false)

  const [inputFieldsByPrice, setInputFieldsByPrice] = useState([
    {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'PRICE',
      shippingRuleOptionTitle: '',
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
  const handleFormChangeByPriceValue = (event, index) => {
    let data = [...inputFieldsByPrice]
    data[index].shippingRuleOptionTitle = event
    setInputFieldsByPrice(data)
  }
  const addFieldsByPrice = () => {
    let object = {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'PRICE',
      shippingRuleOptionTitle: '',
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
      shippingRuleOptionTitle: '',
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
  const handleFormChangeByWeightValue = (event, index) => {
    let data = [...inputFieldsByWeight]
    data[index].shippingRuleOptionTitle = event
    setInputFieldsByWeight(data)
  }
  const addFieldsByWeight = () => {
    let object = {
      shippingFlatFee: 0,
      minAmount: 0,
      maxAmount: 0,
      basedOn: 'WEIGHT',
      shippingRuleOptionTitle: '',
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
                checked={rateByPriceStandardShipping}
                onClick={(e) => {
                  if (e.target.checked === true) {
                    setRateByPriceStandardShipping(true)
                    setRateByWeightStandardShipping(false)
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
                checked={rateByWeightStandardShipping}
                onClick={(e) => {
                  if (e.target.checked === true) {
                    setRateByWeightStandardShipping(true)
                    setRateByPriceStandardShipping(false)
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

            {rateByPriceStandardShipping === true ? (
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
                        // placeholder='0'
                        type='text'
                        label='Title'
                        style={{ marginBottom: 0 }}
                        value={form.shippingRuleOptionTitle}
                        // onInputChange={(e) => setTitle(e)}
                        onInputChange={(e) =>
                          handleFormChangeByPriceValue(e, index)
                        }
                      />
                    </Grid>
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='0'
                        type='number'
                        label='Min. Price'
                        style={{ marginBottom: 0 }}
                        value={form.minAmount}
                        onInputChange={(e) =>
                          handleFormChangeByPriceMinAmount(
                            Math.abs(parseFloat(e)),
                            index
                          )
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
                        onInputChange={(e) => {
                          handleFormChangeByPriceMaxAmount(
                            Math.abs(parseFloat(e)),
                            index
                          )
                        }}
                        onBlur={function (e) {
                          if (
                            parseFloat(e) >
                            parseFloat(inputFieldsByPrice[index].minAmount)
                          ) {
                            setIsError(false)
                            handleFormChangeByPriceMaxAmount(
                              Math.abs(parseFloat(e)),
                              index
                            )
                          } else {
                            setIsError(true)
                            handleFormChangeByPriceMaxAmount('', index)
                            toast.error(
                              'Max amount cannot be less than the min amount'
                            )
                          }
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <SharedFormInput
                        placeholder='100'
                        label='Shipping Cost'
                        style={{ marginBottom: 0 }}
                        value={form.shippingFlatFee}
                        onInputChange={(e) =>
                          handleFormChangeByPriceFlatShipping(
                            Math.abs(parseFloat(e)),
                            index
                          )
                        }
                        onBlur={(e) => {
                          if (parseFloat(e) < 0) {
                            handleFormChangeByWeightFlatShipping(
                              Math.abs(parseFloat(e)),
                              index
                            )
                          }
                        }}
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
                  onClick={() => {
                    let errorExists = false
                    inputFieldsByPrice.map((field) => {
                      if (
                        field.minAmount == 0 ||
                        field.maxAmount == 0 ||
                        field.shippingFlatFee == 0
                      ) {
                        errorExists = true
                      }

                      if (
                        field.minAmount !== field.maxAmount &&
                        field.minAmount < field.maxAmount &&
                        field.shippingFlatFee > 0
                      ) {
                      } else {
                        errorExists = true
                      }
                    })

                    if (errorExists === true) {
                      toast.error('Invalid Values')
                      return
                    } else {
                      addFieldsByPrice()
                    }
                  }}
                >
                  Add New
                </Typography>
              </>
            ) : rateByWeightStandardShipping === true ? (
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
                        // placeholder='0'
                        type='text'
                        label='Title'
                        style={{ marginBottom: 0 }}
                        value={form.shippingRuleOptionTitle}
                        // onInputChange={(e) => setTitle(e)}
                        onInputChange={(e) =>
                          handleFormChangeByWeightValue(e, index)
                        }
                      />
                    </Grid>
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='0'
                        type='number'
                        label='Min. Weight (kg)'
                        style={{ marginBottom: 0 }}
                        value={form.minAmount}
                        onInputChange={(e) =>
                          handleFormChangeByWeightMinAmount(
                            Math.abs(parseFloat(e)),
                            index
                          )
                        }
                      />
                    </Grid>
                    <Grid item marginRight={2}>
                      <SharedFormInput
                        placeholder='100'
                        label='Max. Weight (kg)'
                        style={{ marginBottom: 0 }}
                        value={form.maxAmount}
                        onInputChange={(e) => {
                          handleFormChangeByWeightMaxAmount(
                            Math.abs(parseFloat(e)),
                            index
                          )
                        }}
                        type='number'
                        onBlur={function (e) {
                          if (
                            e > inputFieldsByWeight[index].minAmount &&
                            e != inputFieldsByWeight[index].minAmount
                          ) {
                            setIsError(false)
                            handleFormChangeByWeightMaxAmount(
                              Math.abs(parseFloat(e)),
                              index
                            )
                          } else {
                            handleFormChangeByWeightMaxAmount('', index)
                            setIsError(true)
                            toast.error(
                              'Max amount cannot be less than the min amount'
                            )
                          }
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <SharedFormInput
                        placeholder='100'
                        label='Shipping Cost'
                        style={{ marginBottom: 0 }}
                        value={form.shippingFlatFee}
                        onInputChange={(e) =>
                          handleFormChangeByWeightFlatShipping(
                            Math.abs(parseFloat(e)),
                            index
                          )
                        }
                        onBlur={(e) => {
                          if (parseFloat(e) < 0) {
                            handleFormChangeByWeightFlatShipping(
                              Math.abs(parseFloat(e)),
                              index
                            )
                          }
                        }}
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
                  onClick={() => {
                    let errorExists = false

                    inputFieldsByWeight.map((field) => {
                      if (
                        field.minAmount == 0 ||
                        field.maxAmount == 0 ||
                        field.shippingFlatFee == 0
                      ) {
                        errorExists = true
                      }

                      if (
                        field.minAmount != field.maxAmount &&
                        field.minAmount < field.maxAmount &&
                        field.shippingFlatFee > 0
                      ) {
                      } else {
                        errorExists = true
                      }
                    })

                    if (errorExists === true) {
                      toast.error('Enter valid range first')
                      return
                    }
                    addFieldsByWeight()
                  }}
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

export default StandardShipping
