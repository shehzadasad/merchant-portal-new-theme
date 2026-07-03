import React from 'react'
import { useField } from 'formik'
import TextField from '@mui/material/TextField'

const AppTextField = (props) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      onChange={props.onChange}
      value={props.value}
    />
  )
}

export default AppTextField
