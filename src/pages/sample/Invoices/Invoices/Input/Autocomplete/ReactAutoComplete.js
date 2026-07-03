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
    props.setPRDSearchString(string)
    setLoading(true)
    let val = string

    // if(val.length == 1 || val.length == 3 || val.length == 5 || val.length == 7 || val.length == 9 || val.length == 11 || val.length == 13 || val.length == 15) {
    let localToken = localStorage.getItem('token')

    let postData = {
      token: userDetail.id,
      search: val,
    }

    await axios
      .post(
        `${process.env.REACT_APP_INVOICE_API}/invoice/searchproducts`,
        postData
      )
      .then((response) => {
        props.setProductSearchError('')
        setLoading(false)

        let permProdOptions = [
          {
            id: 'add-product1',
            name: 'Add New Product',
            custom: val,
          },
          // {
          //   id: 'add-product2',
          //   name: 'Add One Time Product',
          //   custom: val,
          // },
        ]

        let options = []
        let prevOptions = permProdOptions
        let newOptions = response.data.data

        options = prevOptions.concat(newOptions)
        // options.push(prevOptions)

        props.setProductOptions(options)
      })
      .catch((error) => {
        setLoading(false)

        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          props.setProductSearchError(error.response.data.msg)
        } else {
          props.setProductSearchError('Sorry cannot get products right now')
        }
      })
    // }
  }

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    // the item selected
    let prods = [...props.productsSelected]

    if (item.id == 'add-product1') {
      props.setShowAddProductModalToBE(true)
    } else if (item.id == 'add-product2') {
      props.showProductModal()
    } else {
      if (prods.indexOf(item) == -1) {
        prods.push(item)
        props.setProductsSelected(prods)
      }
    }
  }

  const handleOnFocus = () => {}

  const formatResult = (item) => {
    return (
      <div>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        {(item.id == 'add-product1' || item.id == 'add-product2') && (
          <span
            style={{
              display: 'block',
              textAlign: 'left',
              color: '#E71583',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            <img src={PinkPlusIcon} /> {item.name}
          </span>
        )}
        {item.id != 'add-product1' && item.id != 'add-product2' && (
          <span style={{ display: 'block', textAlign: 'left', color: 'black' }}>
            {item.name}
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {/* <img src={SearchIcon} className={styles.SearchIcon} /> */}
      <ReactSearchAutocomplete
        items={props.productOptions}
        fuseOptions={{
          shouldSort: false,
          keys: ['name', 'custom'],
        }}
        inputSearchString={props.PRDSearchString}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        placeholder='Search Products'
        // autoFocus
        formatResult={formatResult}
        styling={
          props.showAddCustomerModal ||
          props.showAddProductModal ||
          props.showAddProductModalToBE
            ? { borderRadius: '5px' }
            : { zIndex: '1', borderRadius: '5px' }
        }
        showIcon={false}
        showClear={false}
        maxResults={10}
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
  )
}

export default App
