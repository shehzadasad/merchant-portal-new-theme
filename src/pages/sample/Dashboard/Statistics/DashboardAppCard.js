import { Box, CardHeader, Typography, Card,FormControl ,InputLabel,Select } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Link from '@mui/material/Link'
import infoIcon from 'assets/icon/info.svg'
import PropTypes from 'prop-types'
import { isValidElement } from 'react'
import { Container } from 'react-trello'
import { Fonts } from 'shared/constants/AppEnums'
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';

const DashboardAppCard = ({
  sxStyle,
  title,
  titleStyle,
  headerStyle,
  contentStyle,
  action,
  actionStyle,
  footer,
  footerPosition,
  footerStyle,
  children,
  isInfo,
  setFilterDate,
  filterDate,
  ...rest
}) => {





  const handleChange=(e)=>{
   
    setFilterDate({...filterDate, date:e.target.value , name:title})
   
  }
 
  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', ...sxStyle }}
      {...rest}
    >
      {title || action ? (
        <CardHeader
          sx={{
            px: 6,
            pb: 0,
            '& .MuiCardHeader-action': {
              marginTop: 0,
              marginRight: 0,
            },
            '& .MuiCardHeader-content': {
              overflow: 'hidden',
            },
            ...headerStyle,
          }}
          title={
            typeof title === 'object' ? (
              title
            ) : (
              <Container style={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <Typography
                    component='h3'
                    sx={{
                      color: '#111827',
                      fontWeight: 500,
                      fontSize: 21,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      ...titleStyle,
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
                {isInfo === false ? (
                  ''
                ) : (
                  <Box>
                    <img
                      src={infoIcon}
                      alt='info icon'
                      style={{
                        marginLeft: 10,
                        marginTop: 3,
                      }}
                    />
                  </Box>
                )}
              </Container>
            )
          }
          action={
            typeof action === 'object' ? (
              <FormControl sx={{ m: 1, minWidth: 80 }}>
    
        <Select
            defaultValue={'all'}
           inputProps={{ 'aria-label': 'Without label' }} 
          id="demo-simple-select-autowidth"
          value={filterDate?.date||''}
          onChange={handleChange}
          autoWidth
         
        >
           <MenuItem value="all">
            All
          </MenuItem>
          <MenuItem value={'today'}>Today</MenuItem>
          <MenuItem value={'yesterday'}>Yesterday</MenuItem>
          <MenuItem value={'week'}>Last 7 days</MenuItem>
          <MenuItem value={'month'}>Last 30 days</MenuItem>
        </Select>
      </FormControl>
            ) : (
             <div></div>
            )
          }
        />
      ) : null}
      <CardContent
        sx={{
          height: '100%',
          px: 6,
          '&:last-of-type': {
            pb: 4,
          },
          ...contentStyle,
        }}
      >
        {children}
      </CardContent>
      {footer ? (
        <CardActions
          sx={{
            px: 6,
            pb: 4,
            ...footerStyle,
          }}
        >
          {isValidElement(footer) ? (
            footer
          ) : (
            <Box
              component='span'
              sx={{ ml: footerPosition === 'right' ? 'auto' : 0 }}
            >
              <Link
                color='secondary'
                component='button'
                underline='none'
                sx={{
                  fontSize: 14,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                {footer}
              </Link>
            </Box>
          )}
        </CardActions>
      ) : null}
    </Card>
  )
}

export default DashboardAppCard

DashboardAppCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footerPosition: PropTypes.string,
  className: PropTypes.string,
  sxStyle: PropTypes.object,
  footerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  actionStyle: PropTypes.object,
  children: PropTypes.node,
}

DashboardAppCard.defaultProps = {
  footerPosition: 'left',
}
