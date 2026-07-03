import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  fetchShippingList,
  removeShippingRule,
  setUpdateShippingRuleDetails,
} from 'redux/actions/TaxAction'
import ShippingSharedTable from './ShippingSharedTable'
import { encode } from 'js-base64'

const columns = [
  {
    id: 'id',
    minWidth: 0,
    maxWidth: 0,
    align: 'left',
  },
  {
    id: 'title',
    label: 'Zone Name',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 'emoji',
    label: '',
    minWidth: 2,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'states',
    label: 'State/Province',
    minWidth: 100,
    align: 'center',
    format: 'array',
  },
  {
    id: 'cities',
    label: 'Cities',
    minWidth: 100,
    align: 'center',
    format: 'array',
  },
  {
    id: 'type',
    label: 'Shipping Service',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'basedOn',
    label: 'Based On',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'range',
    label: 'Range',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'shippingFee',
    label: 'Shipping Cost',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'editdeleteicon',
    minWidth: 120,
    align: 'center',
    format: 'img',
  },
]

const ShippingTable = () => {
  const dispatch = useDispatch()
  const [shippingData, setShippingData] = useState([])
  const [shippingAllData, setShippingAllData] = useState([])
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFirst, setIsFirst] = useState(true)

  const userDetail = useSelector((state) => state.users.userDetail)
  const shippings = useSelector((state) => state.tax.shippings)
  const pageData = useSelector((state) => state.tax.shippingsPageData)

  const fetchShippingsHelper = ({ merchantId }) => {
    if (merchantId) {
      dispatch(
        fetchShippingList(
          merchantId,
          parseInt(currentPage) - 1,
          setShippingAllData
        )
      )
    }
  }

  const removeShippingRuleHelper = (ruleId) => {
    dispatch(removeShippingRule(ruleId))
    fetchShippingsHelper(userDetail)
  }

  const onUpdateShippingRuleHelper = (details, id) => {
    if (id !== '') {
      const shippingDetail = shippings.filter(
        (element) => element.id === details.id
      )
      if (!shippingDetail) {
      } else {
        dispatch(setUpdateShippingRuleDetails(shippingDetail[0]))
        return navigate('/shipping/update/' + encode(id))
      }
    }
  }

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.currentPage ? pageData.currentPage + 1 : 1)
      setIsFirst(pageData.first ?? true)

      setTotalPages(pageData.totalPages ?? 1)
    }
  }, [pageData])

  useEffect(() => {
    fetchShippingsHelper(userDetail)
  }, [userDetail])

  useEffect(() => {
    if (userDetail) {
      if (currentPage) {
        fetchShippingsHelper(userDetail)
      }
    }
  }, [currentPage])

  const processData = () => {
    let objectArray = []
    const tempArray = shippings.map((shipping, index) => {
      if (shipping.shippingOption.freeShipping.length > 0) {
        const object = {
          cities: shipping.cities,
          country: shipping.country,
          emoji: shipping.emoji,
          id: shipping.id,
          states: shipping.states,
          type: 'Free Shipping',
          basedOn: shipping.shippingOption.freeShipping[0]?.basedOn,
          minAmount: shipping.shippingOption.freeShipping[0]?.minAmount,
          shippingFee: 0,
          title: shipping.title,
          shippingOption: shipping?.shippingOption,
        }
        objectArray.push(object)
      }
      if (shipping.shippingOption.overnightShipping.length > 0) {
        if (shipping.shippingOption.freeShipping.length > 0) {
          shipping.shippingOption.overnightShipping.map(
            (overnightShippingItem) => {
              const object = {
                cities: [],
                country: '',
                id: shipping.id,
                states: '',
                type: 'Overnight Shipping',
                basedOn: overnightShippingItem?.basedOn,
                minAmount: overnightShippingItem?.minAmount,
                maxAmount: overnightShippingItem.maxAmount,
                shippingFee: overnightShippingItem.shippingFlatFee,
                id: shipping.id,
                title: '',
                shippingOption: shipping?.shippingOption,
              }

              objectArray.push(object)
            }
          )
        } else {
          shipping.shippingOption.overnightShipping.map(
            (overnightShippingItem) => {
              const object = {
                cities: shipping.cities,
                country: shipping.country,
                id: shipping.id,
                states: shipping.states,
                type: 'Overnight Shipping',
                basedOn: overnightShippingItem?.basedOn,
                minAmount: overnightShippingItem.minAmount,
                maxAmount: overnightShippingItem.maxAmount,
                shippingFee: overnightShippingItem.shippingFlatFee,
                id: shipping.id,
                title: shipping.title,
                shippingOption: shipping?.shippingOption,
              }

              objectArray.push(object)
            }
          )
        }
      }
      if (shipping.shippingOption.standardShipping.length > 0) {
        if (shipping.shippingOption.freeShipping.length > 0) {
          shipping.shippingOption.standardShipping.map(
            (standardShippingItem) => {
              const object = {
                cities: [],
                country: '',
                id: shipping.id,
                states: '',
                type: 'Standard Shipping',
                basedOn: standardShippingItem?.basedOn,
                minAmount: standardShippingItem.minAmount,
                maxAmount: standardShippingItem.maxAmount,
                shippingFee: standardShippingItem.shippingFlatFee,
                id: shipping.id,
                title: '',
                shippingOption: shipping?.shippingOption,
              }

              objectArray.push(object)
            }
          )
        } else {
          shipping.shippingOption.standardShipping.map(
            (standardShippingItem) => {
              const object = {
                cities: shipping.cities,
                country: shipping.country,
                id: shipping.id,
                states: shipping.states,
                type: 'Standard Shipping',
                basedOn: standardShippingItem?.basedOn,
                minAmount: standardShippingItem.minAmount,
                maxAmount: standardShippingItem.maxAmount,
                shippingFee: standardShippingItem.shippingFlatFee,
                id: shipping.id,
                title: shipping.title,
                shippingOption: shipping?.shippingOption,
              }

              objectArray.push(object)
            }
          )
        }
      }
    })

    setShippingData(objectArray)
  }

  useEffect(() => {
    processData()
  }, [currentPage, userDetail.merchantId, shippings])

  return (
    <ShippingSharedTable
      rows={shippingData}
      //   columns={columns}
      //   selectRole={false}
      //   timeRange={false}
      //   title={'Shipping Rates'}
      onDelete={removeShippingRuleHelper}
      onEdit={onUpdateShippingRuleHelper}
      // currentPage={currentPage}
      //   totalPages={totalPages}
      //   isFirst={isFirst}
      // setCurrentPage={(e) => setCurrentPage(e)}
      //   setTotalPages={(e) => setTotalPages(e)}
      //   setIsFirst={(e) => setIsFirst(e)}
      //   pageLimit={10}
      //   totalRecords={shippingAllData.totalElements}
      // rows={shippings}
      columns={columns}
      selectRole={false}
      title={'Double Entry Ledger'}
      sheetsURL={'/balancesheet/details'}
      currentPage={currentPage}
      totalPages={pageData.totalPages}
      setCurrentPage={(e) => setCurrentPage(e)}
      totalElements={pageData.totalElements}
      pageLimit={10}
    />
  )
}

export default ShippingTable
