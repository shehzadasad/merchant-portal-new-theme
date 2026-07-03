import React, { useState } from 'react'
// import './App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import SearchIcon from '../../../../../../assets/invoices/searchIccon.svg'
import styles from './ReactAutoComplete.module.css'
import axios from 'axios'
import PinkPlusIcon from '../../../../../../assets/invoices/pinkPlusIcon.svg'
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from 'react-redux'

const queryParams = new URLSearchParams(window.location.search)

function App(props) {
  const [loading, setLoading] = useState(false)
  const userDetail = useSelector((state) => state.users.userDetail)

  async function handleOnSearch(string, results) {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    let val = string

    // if(val.length == 1 || val.length == 3 || val.length == 5 || val.length == 7 || val.length == 9 || val.length == 11 || val.length == 13 || val.length == 15) {

    let postData = {
      token: userDetail.id,
      search: val,
    }

    setLoading(true)
    // ${process.env.REACT_APP_INVOICE_API}
    await axios
      .post(
        `${process.env.REACT_APP_INVOICE_API}/invoice/searchcustomer`,
        postData
      )
      .then((response) => {
        props.setCustomerSearchError('')

        let options = []

        const permOptions = {
          address: '',
          billing: '',
          city: null,
          city_name: '',
          cno: '',
          country: null,
          country_name: null,
          email: '',
          id: 'add-customer',
          name: 'Add Customer',
          same_billing: false,
          state: null,
          state_name: null,
          taxfee: null,
          zip: null,
          custom: val,
        }

        let prevOptions = [permOptions]
        let newOptions = response.data.data

        options = prevOptions.concat(newOptions)

        // options.push(prevOptions)

        props.setCustomerOptions(options)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)

        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          props.setCustomerSearchError(error.response.data.msg)
        } else {
          props.setCustomerSearchError('Sorry cannot get customers right now')
        }
      })
    // }
  }

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    // the item selected
    if (item.id == 'add-customer') {
      props.showModal()

      props.setCustomerSelected(null)
    } else {
      props.setCustomerSelected(item)
      // props.setCustomerSelected(null)
    }
  }

  const onCustomerClear = (item) => {
    props.setCustomerSelected(null)
  }

  const handleOnFocus = () => {}

  const formatResult = (item, i) => {
    console.log(item, 'kia  ab in k saath123')

    return (
      <div key={item.id} style={{ zIndex: '9999' }}>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        {console.log(item, 'kia karain ab in k saath')}
        {item.id === 'add-customer' && (
          <span
            style={{
              display: 'block',
              textAlign: 'left',
              color: '#E71583',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            <img onClick={props.showModal} src={PinkPlusIcon} /> {item.name}
            <div>{item.address}</div>
          </span>
        )}
        {item.id != 'add-customer' && (
          <span style={{ display: 'block', textAlign: 'left', color: 'black' }}>
            {item.name} - {item.email ? item.email : item.cno}
          </span>
        )}
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          height: '15rem',
        }}
      >
        {/* <img src={SearchIcon} className={styles.SearchIcon} /> */}

        <ReactSearchAutocomplete
          items={props.customerOptions}
          fuseOptions={{
            shouldSort: false,
            keys: ['name', 'custom'],
          }}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={onCustomerClear}
          placeholder='Search Customers'
          // autoFocus
          formatResult={formatResult}
          styling={
            !(
              props.showAddCustomerModal ||
              props.showAddProductModal ||
              props.showAddProductModalToBE
            )
              ? {
                  zIndex: '999',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  padding: '30px',
                }
              : {
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  padding: '30px',
                }
          }
          showIcon={false}
          showClear={true}
          maxResults={100}
          marginLeft='12px'
          inputSearchString={
            props.customerSelected ? props.customerSelected?.name : ''
          }
        />
        <ClipLoader
          color='#E72E80'
          loading={loading}
          size={30}
          css={{
            position: 'absolute',
            zIndex: '99999999999999999999',
            left: '85%',
            top: '25%',
          }}
        />
      </div>
    </div>
  )
}
export default App
