import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SharedSiteTable from './SharedSiteTable'

const columns = [
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  {
    id: 'domain',
    label: 'WEBSITE URL',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'platform',
    label: 'PLATFORM',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'vieweditdeleteicon',
    label: '',
    minWidth: 20,
    align: 'center',
  },
]

const createData = (id, webURL, platform) => {
  return { id, webURL, platform }
}

const rows = [createData(1, 'https://domain-esports.com', 'Shopify')]

const SiteTable = () => {
  const [sites, setSites] = useState([])
  const userDetail = useSelector((state) => state.users.userDetail)

  const fetchSites = () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}merchant/sites/list?merchant_user_id=${userDetail.id}`,
    }

    axios(config)
      .then(function (response) {
        setSites(response.data.merchant_sites)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteSite = (siteId) => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}merchant/sites/delete?merchant_user_id=${userDetail.id}&merchant_site_id=${siteId}`,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Site deleted successfully')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchSites()
  }, [userDetail.id])
  return (
    <SharedSiteTable
      rows={sites}
      columns={columns}
      title={'Sites'}
      deleteSite={deleteSite}
    />
  )
}

export default SiteTable
