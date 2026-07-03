import React from 'react'

import styles from './ProductsSelected.module.css'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import DustBinIcon from '../../../../../assets/invoices/dustBin-CI.svg'

export default function ProductsSelect(props) {
  function currencyFormat(num) {
    num = Number(num)
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div>
      <p className={styles.NumberOfProducts}>
        {props.NumberOfProducts} items selected
      </p>

      <div>
        {props.ProductsSelected.map((product, i) => {
          return (
            <div
              className={` ${
                i % 2 == 1 ? styles.ProductRow1 : styles.ProductRow0
              }`}
              style={{ display: 'flex' }}
            >
              <div className={styles.VariantHeading1}>
                {product.name && product.name.length > 15
                  ? product.name.slice(0, 15) + '....'
                  : product.name}
              </div>

              <div style={{ display: 'flex' }}>
                <p className={styles.VariantHeading3}>Qty</p>
                <FormControl
                  className={styles.QtySelect}
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <Select
                    defaultValue={1}
                    // value={age}
                    onChange={(e) => props.SelectQty(e, product)}
                    className={styles.VariantInput}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem className={styles.Qtydropdown} value={1}>
                      1
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={2}>
                      2
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={3}>
                      3
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={4}>
                      4
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={5}>
                      5
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={6}>
                      6
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={7}>
                      7
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={8}>
                      8
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={9}>
                      9
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={10}>
                      10
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={11}>
                      11
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={12}>
                      12
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={13}>
                      13
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={14}>
                      14
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={15}>
                      15
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={16}>
                      16
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={17}>
                      17
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={18}>
                      18
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={19}>
                      19
                    </MenuItem>
                    <MenuItem className={styles.Qtydropdown} value={20}>
                      20
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: 'flex' }}>
                <p className={styles.Price}>
                  {product.currency ? product.currency : 'PKR'}{' '}
                  {currencyFormat(
                    Number(
                      product.totalPrice
                        ? product.totalPrice
                        : product.variant
                        ? product.variant.price
                        : product.variants
                        ? product.variants[0]
                          ? product.variants[0].price
                          : product.price
                        : product.price
                    )
                  )}
                </p>

                <img
                  src={DustBinIcon}
                  className={styles.DustBinIcon}
                  onClick={(e) => props.DeleteProduct(e, product)}
                  alt='dust bin'
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
