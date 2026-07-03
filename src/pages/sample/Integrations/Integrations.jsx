import React, { useState, useEffect, useRef } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  TabPanel,
  Button,
} from '@mui/material'
import './integrations.css'
import SharedSearchBox from 'shared/components/SharedSearchBox'
import ConnectIntegrationModal from './ConnectIntegrationModal'
import AppLoader from '@crema/core/AppLoader'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import EditModal from './EditModal'

const Integrations = () => {
  const [SearchParams, setSearchParams] = useState('')
  const textInput = React.useRef(null)

  //////////////////////// --- User Details --- ////////////////////////
  const userDetail = useSelector((state) => state.users.userDetail)
  //////////////////////// --- User Details END --- ////////////////////////

  //////////////////////// --- Tabs --- ////////////////////////
  const [value, setValue] = useState('one')
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setSearchParams('')
    textInput.current.value = ''
  }
  //////////////////////// --- Tabs END --- ////////////////////////

  //////////////////////// --- Modal --- ////////////////////////
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const [openEditModal, setOpenEditModal] = useState(false)
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  //////////////////////// --- Modal END --- ////////////////////////

  //////////////////////// --- GET THIRD PARTY LIST --- ////////////////////////
  const [isLoading, setIsLoading] = useState(true)
  const [ThirdPartyItems, setThirdPartyItems] = useState([])
  const [data, setData] = useState('')

  const getThirdPartyList = () => {
    setIsLoading(true)
    var myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    }

    fetch(
      process.env.REACT_APP_API_URL +
        `merchant/third-party/list?merchant_user_id=${userDetail.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Result => ', result)
        if (result.success) {
          setThirdPartyItems(result)
          setIsLoading(false)
        }
      })
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    getThirdPartyList()
  }, [userDetail.id])
  //////////////////////// --- GET THIRD PARTY LIST END --- ////////////////////////

  //////////////////////// --- Delete THIRD PARTY LIST --- ////////////////////////
  const DeletePackage = (id) => {
    toast.info('Deleting...')
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    fetch(
      process.env.REACT_APP_API_URL +
        `merchant/third-party/delete/${userDetail.id}/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.success === true) {
          toast.success('Deleted Successfully.')
          getThirdPartyList()
        }
      })
      .catch((error) => console.log('error', error))
  }
  //////////////////////// --- Delete THIRD PARTY LIST END--- ////////////////////////

  return isLoading === true ? (
    <AppLoader />
  ) : (
    <div id='Integrations'>
      <Box display='flex' justifyContent={'center'}>
        <Box
          width='800px'
          bgcolor={'#ffff'}
          padding='30px'
          borderRadius={'10px'}
          boxShadow='0px 4px 8px rgba(0, 0, 0, 0.08)'
        >
          <Box display='flex' justifyContent={'space-between'}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor='secondary'
              indicatorColor='secondary'
              aria-label='secondary tabs example'
            >
              <Tab value='one' label='All' />
              <Tab value='two' label='Connected' />
            </Tabs>
            <SharedSearchBox
              id='search-box'
              width={window.innerWidth > 600 ? 290 : '100%'}
              value={SearchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              inputRef={textInput}
            />
          </Box>

          {value === 'one' ? (
            <>
              {ThirdPartyItems.available_apps.length === 0 && (
                <Box
                  marginLeft={'20px'}
                  marginTop={'20pt'}
                  style={{ width: '70%' }}
                >
                  <Typography>No Apps Found!</Typography>
                </Box>
              )}
              {ThirdPartyItems.available_apps
                .filter((fl) =>
                  fl.name
                    .toLocaleUpperCase()
                    .match(SearchParams.toLocaleUpperCase())
                )
                .map((item, index) => {
                  return (
                    <Box display='flex' marginTop={'40px'} key={index}>
                      <div style={{ width: '15%' }}>
                        <img
                          src={item.logo}
                          alt='omni send'
                          style={{
                            height: '35pt',
                          }}
                        />
                      </div>

                      <Box marginLeft={'20px'} style={{ width: '70%' }}>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.description}</Typography>
                      </Box>

                      <Button
                        style={{
                          background: '#e93a7d',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '15px',
                          fontWeight: '800',
                          textAlign: 'center',
                          width: '130px',
                          border: 'none',
                          height: '36px',
                          marginRight: 17,
                          marginLeft: '10pt',
                          marginTop: 20,
                        }}
                        onClick={() => (setData(item), setOpen(true))}
                      >
                        Connect
                      </Button>
                    </Box>
                  )
                })}
            </>
          ) : (
            <>
              {ThirdPartyItems.installed_apps.length === 0 && (
                <Box
                  marginLeft={'20px'}
                  marginTop={'20pt'}
                  style={{ width: '70%' }}
                >
                  <Typography>No Apps Found!</Typography>
                </Box>
              )}
              {ThirdPartyItems.installed_apps
                ?.filter((fl) =>
                  fl.name
                    .toLocaleUpperCase()
                    .match(SearchParams.toLocaleUpperCase())
                )
                .map((item, index) => {
                  return (
                    <Box display='flex' marginTop={'40px'} key={index}>
                      <div style={{ width: '15%' }}>
                        <img
                          src={item.logo}
                          alt='omni send'
                          style={{
                            height: '35pt',
                          }}
                        />
                      </div>

                      <Box marginLeft={'20px'} style={{ width: '70%' }}>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.description}</Typography>
                      </Box>

                      <Button
                        style={{
                          background: '#e93a7d',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '15px',
                          fontWeight: '800',
                          textAlign: 'center',
                          width: '130px',
                          height: '36px',
                          marginLeft: '10pt',
                          marginTop: 20,
                        }}
                        onClick={() => (setData(item), setOpenEditModal(true))}
                      >
                        Edit
                      </Button>

                      <Button
                        style={{
                          background: 'white',
                          borderRadius: '8px',
                          border: '2px solid #e93a7d',
                          color: '#e93a7d',
                          fontSize: '15px',
                          fontWeight: '800',
                          textAlign: 'center',
                          width: '130px',
                          height: '36px',
                          marginRight: 17,
                          marginLeft: '8pt',
                          marginTop: 20,
                        }}
                        onClick={() => DeletePackage(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  )
                })}
            </>
          )}
        </Box>

        {/*Add Modal*/}
        {data !== '' && open && (
          <ConnectIntegrationModal
            open={open}
            handleClose={handleClose}
            userDetail={userDetail}
            data={data}
            getThirdPartyList={getThirdPartyList}
          />
        )}

        {/*Add Modal*/}
        {data !== '' && openEditModal && (
          <EditModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            userDetail={userDetail}
            data={data}
            getThirdPartyList={getThirdPartyList}
          />
        )}
      </Box>
    </div>
  )
}

export default Integrations
