import AppList from '@crema/core/AppList'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { Fonts } from '../../../../shared/constants/AppEnums'
import DashboardAppCard from '../Statistics/DashboardAppCard'

const BrowserCell = ({ item }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 5,
      }}
      className='item-hover'
    >
      <Box
        sx={{
          mr: 3.5,
        }}
      >
        <img
          alt=''
          style={{ maxWidth: 40, display: 'block' }}
          src={item.icon}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component='h3'
          sx={{
            fontWeight: Fonts.MEDIUM,
            mb: 0.5,
            fontSize: 14,
          }}
        >
          {item.name}
        </Box>
        <Box
          component='p'
          sx={{
            color: 'text.secondary',
            fontSize: 14,
          }}
        >
          {item.value}
        </Box>
      </Box>
    </Box>
  )
}

BrowserCell.propTypes = {
  item: PropTypes.object,
}

const BrowserCard = ({ browserData }) => {
  const { messages } = useIntl()
  return (
    <DashboardAppCard
      isInfo={false}
      title={messages['eCommerce.browser']}
      contentStyle={{ px: 0 }}
      sxStyle={{ maxHeight: 320, minHeight: 320 }}
    >
      <AppList
        data={browserData}
        renderRow={(item, index) => <BrowserCell item={item} key={index} />}
      />
    </DashboardAppCard>
  )
}

export default BrowserCard

BrowserCard.propTypes = {
  browserData: PropTypes.array,
}
