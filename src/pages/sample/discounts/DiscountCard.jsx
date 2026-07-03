import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  Switch,
  label,
  FormControlLabel,
  MenuItem,
  Menu,
} from '@mui/material'

import DeleteDiscountModal from './DeleteDiscountModal'
import UpdateDiscountModal from './UpdateDiscountModal'
import { createMuiTheme } from '@material-ui/core'
import './discount.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import menu from 'assets/img/horizontalMenu.png'
import { useDispatch, useSelector } from 'react-redux'
const DiscountCard = ({ data, setDiscountsData }) => {
  const userDetail = useSelector((state) => state.users.userDetail)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [checked, setChecked] = useState(true)
  const [discountID, setDiscountID] = useState('')
  const open = Boolean(anchorEl)
  useEffect(() => {
    setChecked(data.status === 'ENABLED' ? true : false)
  }, [])

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handlCloseModal = () => {
    setOpenDelete(false)
    setOpenUpdate(false)
  }

  const handleSwitchChange = (e) => {
    setChecked(e.target.checked)
    let status = e.target.checked === false ? 'DISABLED' : 'ENABLED'
    var myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    var requestOptions = {
      method: 'PATCH',
      redirect: 'follow',
      headers: myHeaders,
    }

    fetch(
      `${process.env.REACT_APP_API_URL}merchant/discounts/bin/change-status?discount_id=${data?.id}&status=${status}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Result => ', result)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <>
      <Box
        bgcolor={'#fff'}
        width='100%'
        height='267px'
        boxShadow='0px 5px 20px 5px rgba(133, 142, 150, 0.15)'
        borderRadius='10px'
        marginTop={'30px'}
        padding={'20px'}
      >
        <Box
          display={'flex'}
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography sx={{ textTransform: 'capitalize' }}>
            {data?.name}{' '}
          </Typography>

          <Box display={'flex'} alignItems='center'>
            <FormControlLabel
              control={
                <Switch checked={checked} onChange={handleSwitchChange} />
              }
              label={checked ? 'Enabled' : 'Disabled'}
            />
            <Box>
              <Box
                component={'img'}
                src={menu}
                onClick={handleClick}
                alt='menu'
              />

              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => {
                    setOpenUpdate(true)
                    setDiscountID(data?.id)
                  }}
                >
                  Update
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenDelete(true)
                    setDiscountID(data?.id)
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {openDelete && (
            <DeleteDiscountModal
              handleCls={handlCloseModal}
              open={openDelete}
              deleteOptionId={discountID}
              setDiscountsData={setDiscountsData}
            />
          )}
          {openUpdate && (
            <UpdateDiscountModal
              handleCls={handlCloseModal}
              open={openUpdate}
              discountId={discountID}
              name={data?.name}
              deleteOptionId={discountID}
              setDiscountsData={setDiscountsData}
            />
          )}
        </Box>
        <Box pl='15px' pt={'10px'} lineHeight='1.5rem'>
          <ul>
            <li>
              {data.discountType === 'PERCENTAGE'
                ? `${data?.discountValue}%`
                : `${data?.discountValue} `}{' '}
              {userDetail?.iso2 === 'PK'
                ? 'Rs'
                : userDetail?.iso2 === 'PH'
                ? '₱'
                : '$ '}
              off entire purchase
            </li>
            <li>
              Minimum purchase of{' '}
              {userDetail?.iso2 === 'PK'
                ? 'Rs'
                : userDetail?.iso2 === 'PH'
                ? '₱'
                : '$ '}{' '}
              {data?.minimumAmount}
            </li>
            <li>
              Maximum Discount of{' '}
              {userDetail?.iso2 === 'PK'
                ? 'Rs'
                : userDetail?.iso2 === 'PH'
                ? '₱'
                : '$ '}{' '}
              {data?.maximumDiscount}
            </li>
          </ul>
          <Box display={'flex'} mt='10px'>
            <Typography sx={{ marginRight: '30px' }}>
              {data?.cardName}
            </Typography>
            <Typography>{data?.binNumber} </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DiscountCard
