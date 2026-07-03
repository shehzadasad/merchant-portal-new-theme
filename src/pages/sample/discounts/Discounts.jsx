import React, { useEffect, useState } from 'react'
import DiscountCard from './DiscountCard'
import DiscountHeader from './DiscountHeader'
import { Box, Button, Typography } from '@mui/material'
import CreateDiscountModal from './CreateDiscountModal'
import { getBinDiscount } from 'redux/actions/DiscountActions'
import copyIcon from 'assets/img/copyIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
const Discounts = () => {
  const userDetail = useSelector((state) => state.users.userDetail)
  const [open, setOpen] = useState(false)
  const [discountsData, setDiscountsData] = useState([])
  const dispatch = useDispatch()
  const handleCreateDiscount = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    dispatch(getBinDiscount(userDetail.merchantId, setDiscountsData))
  }, [userDetail])

  return (
    <div>
      <DiscountHeader />
      <Box bgcolor={'#fff'} padding={'20px'}>
        <Box
          display={'flex'}
          padding='12px'
          alignItems={'center'}
          boxShadow={'0px 3px 12px rgba(133, 142, 150, 0.25)'}
          borderRadius={'90px'}
        >
          <Box
            bgcolor={'#e93a7d'}
            color='#fff'
            padding={'8px 16px'}
            borderRadius='30px'
            marginRight={'22px'}
            sx={{ cursor: 'pointer' }}
          >
            BIN Discounts
          </Box>

          <Box marginRight={'22px'} sx={{ cursor: 'pointer' }}>
            Bundles
          </Box>
          <Box marginRight={'22px'} sx={{ cursor: 'pointer' }}>
            Promos
          </Box>
          <Box marginRight={'22px'} sx={{ cursor: 'pointer' }}>
            Ads
          </Box>
          <Box marginRight={'22px'} sx={{ cursor: 'pointer' }}>
            Upsell
          </Box>
        </Box>
        <Box
          height={discountsData.length > 1 ? '340px' : ''}
          sx={{ overflowY: 'hidden' }}
        >
          <Box
            height={discountsData.length > 1 ? '340px' : ''}
            sx={{ overflowY: 'scroll' }}
            padding='20px'
          >
            {discountsData.reverse().map((data) => {
              return (
                <Box key={uuidv4()}>
                  <DiscountCard
                    data={data}
                    setDiscountsData={setDiscountsData}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexDirection='column'
          justifyContent='center'
          alignItems={'center'}
        >
          {discountsData.length < 1 && (
            <>
              <img src={copyIcon} alt='copy icon' />
              <Typography>
                You haven’t created any BIN discounts yet.
              </Typography>
            </>
          )}

          <Button
            variant='contained'
            sx={{
              background: '#e93a7d',
              borderRadius: '28px',
              color: '#fff',
              padding: '12px 20px',
              border: 'none',
              marginTop: '50px',
            }}
            onClick={handleCreateDiscount}
          >
            Create bin discount
          </Button>
          {open && (
            <CreateDiscountModal
              handleCls={handleClose}
              open={open}
              setDiscountsData={setDiscountsData}
            />
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Discounts
