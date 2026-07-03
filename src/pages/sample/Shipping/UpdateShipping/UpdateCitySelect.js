import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    borderRadius: 2,
  }
}

const UpdateCitySelect = ({
  names,
  label,
  multiple,
  onSelect,
  selectedCity,
  fieldChanged,
}) => {
  const theme = useTheme()

  const [personName, setPersonName] = useState(selectedCity ? selectedCity : [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName([])

    setPersonName(typeof value === 'string' ? value.split(',') : value)

    if (onSelect) {
      onSelect(value)
    }
  }

  useEffect(() => {
    setPersonName(selectedCity ? selectedCity : [])
  }, [selectedCity])

  useEffect(() => {
    if (fieldChanged === true) {
      setPersonName([])
    }
  }, [fieldChanged])

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id='demo-multiple-chip-label'>
          {label ?? 'Select Roles'}
        </InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple={multiple !== undefined ? multiple : true}
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id='select-multiple-chip'
              label={label ?? 'Select Roles'}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value, index) => (
                <Chip key={index} label={value} style={{ borderRadius: 5 }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name, index) => (
            <MenuItem
              key={index}
              value={name.name}
              style={getStyles(name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

UpdateCitySelect.propTypes = {
  names: PropTypes.array,
  label: PropTypes.string,
  multiple: PropTypes.bool,
}

export default UpdateCitySelect
