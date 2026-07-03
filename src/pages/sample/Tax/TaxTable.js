import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTaxList,
  openUpdateTaxModal,
  removeTaxRule,
  setUpdateTaxRuleDetails,
} from 'redux/actions/TaxAction'
import SharedTaxTable from './SharedTaxTable'

const columns = [
  { id: 'title', label: 'Rule\u00a0Name', minWidth: 100, align: 'left' },
  {
    id: 'taxPercentage',
    label: 'Tax\u00a0Percentage	',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'taxOnShipping',
    label: 'Shipping\u00a0Tax',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'emoji',
    label: '',
    minWidth: 0,
    align: '',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 50,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'states',
    label: 'Region',
    minWidth: 100,
    align: 'left',
    format: 'array',
  },
  {
    id: 'editdeleteicon',
    minWidth: 120,
    align: 'center',
    format: 'img',
  },
]

const OrderTable = () => {
  const dispatch = useDispatch()
  const userDetail = useSelector((state) => state.users.userDetail)
  const taxes = useSelector((state) => state.tax.taxes)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFirst, setIsFirst] = useState(true)
  const pageData = useSelector((state) => state.tax.taxesPageData)

  const fetchTaxesHelper = ({ merchantId }) => {
    if (merchantId) {
      if (currentPage) {
        dispatch(fetchTaxList(merchantId, parseInt(currentPage) - 1))
      }
    }
  }

  const removeTaxRuleHelper = (ruleId) => {
    dispatch(removeTaxRule(ruleId))

    fetchTaxesHelper(userDetail)
  }

  const onUpdateTaxRuleHelper = (details) => {
    dispatch(openUpdateTaxModal(true))
    dispatch(setUpdateTaxRuleDetails(details))
  }

  useEffect(() => {
    fetchTaxesHelper(userDetail)
  }, [userDetail])

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.currentPage ? pageData.currentPage + 1 : 1)
      setIsFirst(pageData.first ?? true)
      setTotalPages(pageData.totalPages ?? 1)
    }
  }, [pageData])

  useEffect(() => {
    if (userDetail) {
      fetchTaxesHelper(userDetail)
    }
  }, [currentPage])

  return (
    <SharedTaxTable
      rows={taxes}
      columns={columns}
      selectRole={false}
      title={'Tax Rules'}
      onDelete={removeTaxRuleHelper}
      onEdit={onUpdateTaxRuleHelper}
      currentPage={currentPage}
      totalPages={totalPages}
      isFirst={isFirst}
      setCurrentPage={(e) => setCurrentPage(e)}
      setTotalPages={(e) => setTotalPages(e)}
      setIsFirst={(e) => setIsFirst(e)}
    />
  )
}

export default OrderTable
