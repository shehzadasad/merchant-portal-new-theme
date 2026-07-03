import PropTypes from 'prop-types'
import AppLogo from '../AppLogo'

const UserInfo = () => {
  return (
    <>
      <AppLogo />
    </>
  )
}

export default UserInfo

UserInfo.defaultProps = {
  color: 'text.secondary',
}

UserInfo.propTypes = {
  color: PropTypes.string,
}
