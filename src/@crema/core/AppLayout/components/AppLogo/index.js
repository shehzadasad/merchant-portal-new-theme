import { Box } from '@mui/material'
import React, { useState } from 'react'
import { ReactComponent as Logo } from '../../../../../assets/icon/logo.svg'
import { useThemeContext } from '../../../../utility/AppContextProvider/ThemeContextProvider'
import SplitmoLogo from '../../../../../assets/img/SplitmoLogo.png'

const AppLogo = () => {
  const { theme } = useThemeContext()
  const [merchantType, setMerchantType] = useState(
    localStorage.getItem('merchantType') ?? ''
  )

  return (
    <Box
      sx={{
        height: { xs: 56, sm: 68 },
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: { xs: 40, sm: 40 },
        },
      }}
      className='app-logo'
    >
      {merchantType === '' ? (
        ''
      ) : merchantType === 'QISSTPAY' ? (
        <Logo fill={theme.palette.primary.main} />
      ) : merchantType === '4GIVES' ? (
        <div style={{ position: 'relative' }}>
          <img src={SplitmoLogo} alt='img' style={{ height: '40pt' }} />
          <p
            style={{
              position: 'absolute',
              right: '10pt',
              bottom: '3pt',
              fontSize: '6.5pt',
            }}
          >
            Powered by Qisstpay
          </p>
        </div>
      ) : (
        ''
      )}

      <Box
        sx={{
          mt: 1,
          display: { xs: 'none', md: 'block' },
          '& svg': {
            height: { xs: 25, sm: 30 },
          },
        }}
      ></Box>
    </Box>
  )
}

export default AppLogo
