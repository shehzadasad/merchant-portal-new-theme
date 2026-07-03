import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import SearchBar from '../../@crema/core/AppSearchBar'
import './Style.css'

const SharedSearchBox = (props) => {
  const handleChange = (e) => {
    if (e.target.value === '') {
      props.setSearchText(e.target.value)
    }
  }
  return (
    <Box
      sx={{ '& > :not(style)': { m: 0, border: 'none' } }}
      className='sharedsearch-box'
    >
      <SearchBar
        id={props.id ?? 'Search-Box'}
        placeholder='Search…'
        onChange={props.onChange ?? handleChange}
        onClick={props.onClick ?? handleChange}
        onKeyDown={props.onKeyDown ?? handleChange}
        onBlur={props.onBlur ?? handleChange}
        iconStyle={{ cursor: 'pointer' }}
        inputRef={props.inputRef}
      />
    </Box>
  )
}

SharedSearchBox.propTypes = {
  width: PropTypes.any,
}

export default SharedSearchBox
