import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoles } from 'redux/reducers/Users'

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

const SharedRolesSelect = ({ onChange }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [personName, setPersonName] = useState([])

  const roles = useSelector((state) => state.users.roles)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)

    if (onChange) {
      onChange(value)
    }
  }

  const fetchRolesHelper = () => {
    dispatch(fetchRoles())
  }
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    fetchRolesHelper()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id='demo-multiple-chip-label'>Select Roles</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput id='select-multiple-chip' label='Select Roles' />
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
          {roles.map((role) => (
            <MenuItem
              key={role.id}
              value={role.name}
              style={getStyles(role.name, personName, theme)}
            >
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SharedRolesSelect
