import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Downshift from 'downshift'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
}))

export default function SharedTagsInputEdit({ ...props }) {
  const classes = useStyles()
  const {
    selectedTags,
    placeholder,
    tags,
    deletedTags,
    setSelectedTagsArray,
    SelectedTagsArray,
    indexNo,
    setTotalTagsArray,
    TotalTagsArray,
    VariationDetails,
    setVariationDetails,
    PVariants,
    ...other
  } = props
  const [inputValue, setInputValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState(SelectedTagsArray)
  useEffect(() => {
    FilterSelected()
    if (tags.length !== 0) setSelectedItem(tags)
  }, [tags])
  useEffect(() => {
    selectedTags(selectedItem)
  }, [selectedItem, selectedTags])

  const cartesian = (...args) => {
    var r = [],
      max = args.length - 1
    function helper(arr, i) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0) // clone arr
        a.push(args[i][j])
        if (i === max) r.push(a)
        else helper(a, i + 1)
      }
    }
    helper([], 0)

    return r
  }

  const variantDetailLoop = (arr) => {
    let ar = []
    for (let i = 0; i < arr.length; i++) {
      ar.push({
        check: false,
        id: null,
        sku: '',
        variant_attributes: arr[i],
        available_stock: '',
        price: '',
        featured_image: {
          name: '',
          base64: '',
        },
      })
    }

    for (let i = 0; i < PVariants.length; i++) {
      for (let j = 0; j < ar.length; j++) {
        if (
          JSON.stringify(PVariants[i]?.variant_attributes) ===
          JSON.stringify(ar[j].variant_attributes)
        ) {
          ar[j].check = true
          ar[j].id = parseInt(PVariants[i]?.id)
          ar[j].sku = PVariants[i]?.sku

          ar[j].available_stock = PVariants[i].available_stock
          ar[j].price = PVariants[i]?.price
          ar[j].sale_price = PVariants[i]?.sale_price
          ar[j].featured_image = {
            url: PVariants[i].featured_image,
          }
        }
      }
    }

    setVariationDetails(ar)
  }

  const FilterSelected = () => {
    let newArr = [...SelectedTagsArray]

    if (newArr.length === 1) {
      let arr = cartesian(newArr[0].data)
      setTotalTagsArray(arr)
      variantDetailLoop(arr)
    } else if (newArr.length === 2) {
      let arr = cartesian(newArr[0].data, newArr[1].data)
      setTotalTagsArray(arr)
      variantDetailLoop(arr)
    } else if (newArr.length === 3) {
      let arr = cartesian(newArr[0].data, newArr[1].data, newArr[2].data)
      setTotalTagsArray(arr)
      variantDetailLoop(arr)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const newSelectedItem = [...selectedItem]
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      )

      if (duplicatedValues !== -1) {
        setInputValue('')
        return
      }
      if (!event.target.value.replace(/\s/g, '').length) return

      let newArr = [...SelectedTagsArray]
      newArr[indexNo].data.push(event.target.value.trim())

      setSelectedTagsArray(newArr)

      if (newArr.length === 1) {
        let arr = cartesian(newArr[0].data)
        setTotalTagsArray(arr)
        variantDetailLoop(arr)
      } else if (newArr.length === 2) {
        let arr = cartesian(newArr[0].data, newArr[1].data)
        setTotalTagsArray(arr)
        variantDetailLoop(arr)
      } else if (newArr.length === 3) {
        let arr = cartesian(newArr[0].data, newArr[1].data, newArr[2].data)
        setTotalTagsArray(arr)
        variantDetailLoop(arr)
      } else if (newArr.length === 4) {
        let arr = cartesian(
          newArr[0].data,
          newArr[1].data,
          newArr[2].data,
          newArr[3].data
        )
        setTotalTagsArray(arr)
        variantDetailLoop(arr)
      } else if (newArr.length === 5) {
        let arr = cartesian(
          newArr[0].data,
          newArr[1].data,
          newArr[2].data,
          newArr[3].data,
          newArr[4].data
        )
        setTotalTagsArray(arr)
        variantDetailLoop(arr)
      }

      newSelectedItem.push(event.target.value.trim())

      setSelectedItem(newSelectedItem)
      setInputValue('')
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    deletedTags(item)

    let newArr = [...SelectedTagsArray]

    let aar = [...VariationDetails]
    for (let i = 0; i < aar.length; i++) {
      if (aar[i].variant_attributes.includes(item)) {
        aar.splice(i, 1)
        i--
      }
    }
    setVariationDetails(aar)

    if (newArr[indexNo].data.length === 1) {
      newArr[indexNo] = { data: [] }

      if (newArr.length === 1) setTotalTagsArray(cartesian(newArr[0].data))
      else if (newArr.length === 2)
        setTotalTagsArray(cartesian(newArr[0].data, newArr[1].data))
      else if (newArr.length === 3)
        setTotalTagsArray(
          cartesian(newArr[0].data, newArr[1].data, newArr[2].data)
        )
      else if (newArr.length === 4)
        setTotalTagsArray(
          cartesian(
            newArr[0].data,
            newArr[1].data,
            newArr[2].data,
            newArr[3].data
          )
        )
      else if (newArr.length === 5)
        setTotalTagsArray(
          cartesian(
            newArr[0].data,
            newArr[1].data,
            newArr[2].data,
            newArr[3].data,
            newArr[4].data
          )
        )
      setSelectedTagsArray(newArr)
    } else {
      var index = newArr[indexNo].data.indexOf(item)
      if (index > -1) {
        newArr[indexNo].data.splice(index, 1)
      }

      if (newArr.length === 1) setTotalTagsArray(cartesian(newArr[0].data))
      else if (newArr.length === 2)
        setTotalTagsArray(cartesian(newArr[0].data, newArr[1].data))
      else if (newArr.length === 3)
        setTotalTagsArray(
          cartesian(newArr[0].data, newArr[1].data, newArr[2].data)
        )
      else if (newArr.length === 4)
        setTotalTagsArray(
          cartesian(
            newArr[0].data,
            newArr[1].data,
            newArr[2].data,
            newArr[3].data
          )
        )
      else if (newArr.length === 5)
        setTotalTagsArray(
          cartesian(
            newArr[0].data,
            newArr[1].data,
            newArr[2].data,
            newArr[3].data,
            newArr[4].data
          )
        )

      setSelectedTagsArray(newArr)
    }

    setSelectedItem(newSelectedItem)
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }
  return (
    <React.Fragment>
      <Downshift
        id='downshift-multiple'
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          })
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: SelectedTagsArray[indexNo].data.map(
                    (item) => (
                      <Chip
                        key={item}
                        tabIndex={-1}
                        label={item}
                        className={classes.chip}
                        onDelete={handleDelete(item)}
                      />
                    )
                  ),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event)
                    onChange(event)
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          )
        }}
      </Downshift>
    </React.Fragment>
  )
}
SharedTagsInputEdit.defaultProps = {
  tags: [],
}
SharedTagsInputEdit.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
