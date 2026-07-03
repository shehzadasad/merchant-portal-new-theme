import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import PropTypes from 'prop-types'
import CancelIcon from '@mui/icons-material/Cancel'
import { v4 as uuidv4 } from 'uuid'
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

const SharedMultiSelect = ({
  names,
  label,
  multiple,
  onSelect,
  crossBtn = false,
  fetchOrdersHelper,
}) => {
  const theme = useTheme()
  const [personName, setPersonName] = useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)

    if (onSelect) {
      onSelect(value)
    }
  }

  return (
    <div id={crossBtn === true ? 'SharedMultiSelect' : ''}>
      <FormControl sx={{ width: '100%', position: 'relative' }}>
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
              {selected.map((value) => (
                <Chip key={value} label={value} style={{ borderRadius: 5 }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name, index) => (
            <MenuItem
              key={uuidv4()}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        {crossBtn === true ? (
          <div
            style={{
              position: 'absolute',
              right: '22pt',
              top: '15pt',
            }}
            onClick={() => {
              fetchOrdersHelper()
              setPersonName([])
            }}
          >
            <CancelIcon
              id='cancel-icon'
              style={{
                height: '11pt',
                width: '11pt',
                color: '#757575',
              }}
            />
          </div>
        ) : (
          ''
        )}
      </FormControl>
    </div>
  )
}

SharedMultiSelect.propTypes = {
  names: PropTypes.array,
  label: PropTypes.string,
  multiple: PropTypes.bool,
}

export default SharedMultiSelect
