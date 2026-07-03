import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import PropTypes from 'prop-types'

const SharedSelect = (props) => {
  const { selectedValue, handleChange, label, options } = props

  return (
    <Box sx={{ minWidth: 150, marginTop: -2 }}>
      <FormControl variant='standard' fullWidth>
        <InputLabel id='demo-simple-select-standard-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={selectedValue}
          label={label}
          onChange={handleChange}
        >
          {Array.isArray(options)
            ? options.map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))
            : ''}
        </Select>
      </FormControl>
    </Box>
  )
}

SharedSelect.propTypes = {
  selectedValue: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array,
}

export default SharedSelect
