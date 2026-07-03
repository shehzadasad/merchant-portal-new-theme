import React, { useState, useEffect } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMerchantRecommendationSettings,
  updateMerchantRecommendationSettings,
} from 'redux/actions/RecommendationActions'
const RecommendationEngine = () => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)

  const [swtich, setSwitch] = useState({
    topSellingProducts: true,
    hotDeal: true,
    similiarProducts: true,
    togetherProducts: true,
    betterProducts: false,
  })

  const [recommendationData, setRecommendationData] = useState(null)

  useEffect(() => {
    dispatch(
      getMerchantRecommendationSettings(
        userDetail.merchantId,
        setRecommendationData
      )
    )
  }, [userDetail])

  useEffect(() => {
    setSwitch({
      topSellingProducts: recommendationData?.top_selling_product_enabled,
      hotDeal: recommendationData?.hot_deals_enabled,
      similiarProducts: recommendationData?.similar_products_enabled,
      togetherProducts: recommendationData?.bought_together_products_enabled,
      betterProducts: recommendationData?.upsell_better_product_enabled,
    })
  }, [
    recommendationData?.top_selling_product_enabled,
    recommendationData?.hot_deals_enabled,
    recommendationData?.similar_products_enabled,
    recommendationData?.bought_together_products_enabled,
    recommendationData?.upsell_better_product_enabled,
  ])
  const handleSwitchChange = (e, title) => {
    if (title === 'topSellingProducts') {
      const payload = {
        merchant_id: userDetail.merchantId,
        field: 'top_selling_product_enabled',
        value: e.target.checked,
      }
      setSwitch((swtich) => ({
        ...swtich,
        topSellingProducts: e.target.checked,
      }))
      dispatch(updateMerchantRecommendationSettings(payload))
    }
    if (title === 'hotDeals') {
      const payload = {
        merchant_id: userDetail.merchantId,
        field: 'hot_deals_enabled',
        value: e.target.checked,
      }
      setSwitch((swtich) => ({
        ...swtich,
        hotDeal: e.target.checked,
      }))
      dispatch(updateMerchantRecommendationSettings(payload))
    }
    if (title === 'similiarProducts') {
      const payload = {
        merchant_id: userDetail.merchantId,
        field: 'similar_products_enabled',
        value: e.target.checked,
      }
      setSwitch((swtich) => ({
        ...swtich,
        similiarProducts: e.target.checked,
      }))
      dispatch(updateMerchantRecommendationSettings(payload))
    }
    if (title === 'togetherProducts') {
      const payload = {
        merchant_id: userDetail.merchantId,
        field: 'bought_together_products_enabled',
        value: e.target.checked,
      }
      setSwitch((swtich) => ({
        ...swtich,
        togetherProducts: e.target.checked,
      }))

      dispatch(updateMerchantRecommendationSettings(payload))
    }
    if (title === 'betterProducts') {
      const payload = {
        merchant_id: userDetail.merchantId,
        field: 'upsell_better_product_enabled',
        value: e.target.checked,
      }
      setSwitch((swtich) => ({
        ...swtich,
        betterProducts: e.target.checked,
      }))
      dispatch(updateMerchantRecommendationSettings(payload))
    }
  }
  return (
    <Box
      display={'flex'}
      flexDirection='column'
      justifyContent='center'
      alignItems={'center'}
    >
      <Box>
        <Typography fontSize={'20px'} mb='20px'>
          {' '}
          Recommendation Engine
        </Typography>
      </Box>
      <Box
        width='55%'
        bgcolor='#FFFFFF'
        boxShadow='0px 4px 8px rgba(0, 0, 0, 0.08)'
        borderRadius='10px'
        padding='40px'
      >
        <Typography fontSize='18px'>Upselling</Typography>
        <Box
          paddingY='12px'
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
        >
          <Typography>Enable top selling products in checkout</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={swtich.topSellingProducts}
                onChange={(e) => handleSwitchChange(e, 'topSellingProducts')}
              />
            }
          />
        </Box>
        <Divider />
        <Box
          paddingY='12px'
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
        >
          <Typography>Enable Hot Deals (Top discounted products)</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={swtich.hotDeal}
                onChange={(e) => handleSwitchChange(e, 'hotDeals')}
              />
            }
          />
        </Box>
        <Divider />
        <Box
          paddingY='12px'
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
        >
          <Typography>Enable Similar Products (Same Category)</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={swtich.similiarProducts}
                onChange={(e) => handleSwitchChange(e, 'similiarProducts')}
              />
            }
          />
        </Box>
        <Divider />
        <Box
          paddingY='12px'
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
        >
          <Typography>Enable Bought Together Products Upsell</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={swtich.togetherProducts}
                onChange={(e) => handleSwitchChange(e, 'togetherProducts')}
              />
            }
          />
        </Box>
        <Divider />
        <Box
          paddingY='12px'
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
        >
          <Typography>Enable Upsell Better Product</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={swtich.betterProducts}
                onChange={(e) => handleSwitchChange(e, 'betterProducts')}
              />
            }
          />
        </Box>
        <Divider />
      </Box>
    </Box>
  )
}

export default RecommendationEngine
