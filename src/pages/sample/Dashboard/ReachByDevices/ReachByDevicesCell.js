import AppList from '@crema/core/AppList'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { BiDesktop, BiMobile, BiMobileLandscape } from 'react-icons/bi'
import DashboardAppCard from '../Statistics/DashboardAppCard'

const getWelcomeIcon = (iconType) => {
  switch (iconType) {
    case 'BiMobile':
      return <BiMobile color='#069697' size={40} />
    case 'BiTablet':
      return <BiMobileLandscape color='#E72E80' className='icon' size={40} />
    case 'BiDesktop':
      return <BiDesktop color='#F49820' className='icon' size={40} />
    default:
      return <BiDesktop color='#0A8FDC' className='icon' />
  }
}

const ReachByDevicesCell = ({ item }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        py: 5,
        left: 0,
        right: 0,
      }}
      className='item-hover'
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            mr: 4,
            width: { xs: 46, md: 60 },
            height: { xs: 46, md: 60 },
            minWidth: { xs: 46, md: 60 },
            fontSize: { xs: 24, md: 26 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 1.25,
            borderRadius: '50%',
          }}
        >
          {getWelcomeIcon(item.icon)}
        </Box>

        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            component='h3'
            sx={{
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            {item.value}
          </Box>
          <Box
            component='p'
            sx={{
              color: 'text.secondary',
              mb: 0.5,
              fontSize: 14,
            }}
          >
            {item.name}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

ReachByDevicesCell.propTypes = {
  item: PropTypes.object,
}

const Browser = ({ browserData }) => {
  return (
    <DashboardAppCard
      isInfo={false}
      title={'Reach By Devices'}
      contentStyle={{
        px: 0,
        height: 382,
        paddingTop: '10%',
      }}
    >
      <AppList
        data={browserData}
        renderRow={(item, index) => (
          <ReachByDevicesCell item={item} key={index} />
        )}
      />
    </DashboardAppCard>
  )
}

export default Browser

Browser.propTypes = {
  browserData: PropTypes.array,
}
