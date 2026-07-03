import * as React from 'react'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import NativeSelect from '@mui/material/NativeSelect'
import InputBase from '@mui/material/InputBase'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: '-10px',
    marginLeft: '-10px',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '24px 26px 10px 12px',
    marginTop: '9px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      backgroundColor: 'transparent',
    },
  },
}))

export default function CustomizedSelects(props) {
  // const [age, setAge] = React.useState('');

  // const handleChange = (event: { target: { value: string } }) => {
  //   setAge(event.target.value);
  // };
  return (
    <div>
      <FormControl variant='standard' style={{ width: '100%' }}>
        <InputLabel htmlFor='demo-customized-select-native'>
          {props.label}
        </InputLabel>
        {props.id == 'price-type' && (
          <NativeSelect
            id='demo-customized-select-native'
            value={props.value}
            onChange={props.onchange}
            input={<BootstrapInput />}
          >
            <option aria-label='None' value='' />
            <option value='oneTime'>One Time</option>
            <option value='hourly'>Hourly</option>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
          </NativeSelect>
        )}

        {props.id == 'category' && (
          <NativeSelect
            id='demo-customized-select-native'
            value={props.value}
            onChange={props.onchange}
            input={<BootstrapInput />}
          >
            <option aria-label='None' value='' />
            <option value='services'>Services</option>
            <option value='product'>Product</option>
          </NativeSelect>
        )}

        {props.id == 'sub-category' && (
          <NativeSelect
            id='demo-customized-select-native'
            value={props.value}
            onChange={props.onchange}
            input={<BootstrapInput />}
          >
            <option aria-label='None' value='' />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        )}

        {props.id == 'country' && (
          <NativeSelect
            id='demo-customized-select-native'
            value={props.selectedCountry}
            defaultValue={props.selectedCountry}
            onChange={props.onchange}
            input={<BootstrapInput />}
          >
            {props.countriesList &&
              props.countriesList.map((country) => {
                return (
                  <option
                    value={`{"id": "${country.id}", "name": "${country.name}"}`}
                  >
                    {country.name}
                  </option>
                )
              })}
          </NativeSelect>
        )}

        {props.id == 'state' && (
          <NativeSelect
            id='demo-customized-select-native'
            value={props.selectedState}
            onChange={props.onchange}
            input={<BootstrapInput />}
          >
            {props.statesList &&
              props.statesList.map((state) => {
                return (
                  <option
                    value={`{"id": "${state.id}", "name": "${state.name}"}`}
                  >
                    {state.name}
                  </option>
                )
              })}
          </NativeSelect>
        )}

        {props.id == 'city' && (
          <NativeSelect
            id='demo-customized-select-native'
            value={props.value}
            onChange={props.onchange}
            input={<BootstrapInput />}
          >
            {props.citiesList &&
              props.citiesList.map((city) => {
                return (
                  <option
                    value={`{"id": "${city.id}", "name": "${city.name}"}`}
                  >
                    {city.name}
                  </option>
                )
              })}
          </NativeSelect>
        )}
      </FormControl>
    </div>
  )
}
