import React, { useRef, useEffect } from 'react'
import { Grid, Paper, Stack, Typography, Box, Checkbox } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import TrashIcon from 'assets/icon/TrashIcon.svg'
import Uploadimg from 'assets/img/uploadimg.svg'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SharedFormInput from 'shared/components/SharedFormInput'
import SharedTagsInput from 'shared/components/SharedTagsInput'
import Select from 'react-select'
import './Style.css'
import TagsInput from 'shared/components/TagsInput'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const ProductCreate = () => {
  let navigate = useNavigate()
  const [Currency, setCurrency] = useState(localStorage.getItem('currency'))

  const inputElement = useRef(null)
  const [VariantDropDown, setVariantDropDown] = useState({
    value: 'NO',
    label: 'No Variants',
  })
  const VariantDropDownOptions = [
    { value: 'NO', label: 'No Variants' },
    { value: 'YES', label: 'Variants' },
  ]

  const [ActiveDropDown, setActiveDropDown] = useState({
    value: 'YES',
    label: 'YES',
  })
  const ActiveDropDownOptions = [
    {
      value: 'YES',
      label: 'YES',
    },
    {
      value: 'NO',
      label: 'NO',
    },
  ]

  const [PSku, setPSku] = useState('')
  const [PAvailableStock, setPAvailableStock] = useState('')
  const [PPrice, setPPrice] = useState('')
  const [PSalePrice, setPSalePrice] = useState('')
  const [PTags, setPTags] = useState([])
  const handleSelecetedTags2 = (items) => {
    setPTags(items)
  }

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const userDetail = useSelector((state) => state.users.userDetail)
  const [SelectedTagsArray, setSelectedTagsArray] = useState([{ data: [] }])
  const [TotalTagsArray, setTotalTagsArray] = useState([])

  const [VariantNames, setVariantNames] = useState([{ name: '' }])
  const VariantNameHandler = (e, indexNo) => {
    let names = [...VariantNames]
    names[indexNo].name = e
    setVariantNames(names)
  }

  useEffect(() => {
    fn()
  }, [SelectedTagsArray])

  const [check, setCheck] = useState(false)
  const fn = () => {
    let check
    SelectedTagsArray.map((items) => {
      if (items.data.length === 0) check = false
      else check = true
    })

    setCheck(check)
  }

  const cartesian = (...args) => {
    var r = [],
      max = args.length - 1
    function helper(arr, i) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0) // clone arr
        a.push(args[i][j])
        if (i == max) r.push(a)
        else helper(a, i + 1)
      }
    }
    helper([], 0)

    return r
  }

  const [VariationDetails, setVariationDetails] = useState([])

  const checker = (index) => {
    let result = [...VariationDetails]
    result = result[index].check

    return result
  }

  const deleteVariant = (indexNo) => {
    const newArr = [...SelectedTagsArray]
    newArr.splice(indexNo, 1)

    let aar = [...VariationDetails]
    for (let i = 0; i < aar.length; i++) {
      aar[i].check = false
      aar[i].featured_image = {
        name: '',
        base64: '',
      }
    }
    setVariationDetails(aar)

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

  const checkImage = (index) => {
    let arr = [...VariationDetails]
    if (arr[index].featured_image.base64 === '') {
      return Uploadimg
    } else return 'data:image/jpeg;base64, ' + arr[index].featured_image.base64
  }

  const [ImageIndex, setImageIndex] = useState('')

  const UploadImage = () => {
    document.getElementById('VariantImage').click()
  }

  const VariantImageUpload = (event) => {
    base64(event.target.files[0], ImageIndex, event)
  }

  const base64 = (file, index, e) => {
    return new Promise((resolve) => {
      let fileInfo
      let baseURL = ''
      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result

        let arr = [...VariationDetails]
        arr[index].featured_image.name = file.name
        var strImage = baseURL.replace(/^data:image\/[a-z]+;base64,/, '')
        arr[index].featured_image.base64 = strImage.toString()

        setVariationDetails(arr)

        resolve(baseURL)
      }

      e.target.value = null
    })
  }

  const getVariantAttributeObject = (array) => {
    let attributes = filterAttributes([...SelectedTagsArray], [...VariantNames])
    let VariantObj = {}
    attributes.map((item, index) => {
      VariantObj[item.name] = array[index]
    })

    return VariantObj
  }

  const handleVariationDetails = ({ ...data }) => {
    const regex = /^[0-9\b]+$/
    let newArr = [...VariationDetails]
    if ((data.checbox && data.checbox === true) || data.checbox === false) {
      newArr[data.index].check = data.checbox
      // newArr[data.index].variant_attributes = TotalTagsArray[data.index]
      newArr[data.index].variant_attributes = getVariantAttributeObject(
        TotalTagsArray[data.index]
      )
    }
    if (data.price) {
      if (data.price !== '' && !regex.test(data.price)) {
        toast.error(' price should be a positive integer')
      } else {
        newArr[data.index].price = parseInt(data.price)
      }
    }
    if (data.sale_price) {
      if (data.sale_price !== '' && !regex.test(data.sale_price)) {
        toast.error('sale price should be a positive integer')
      } else {
        newArr[data.index].sale_price = parseInt(data.sale_price)
      }
    }
    if (data.available_stock) {
      if (data.available_stock !== '' && !regex.test(data.available_stock)) {
        toast.error('Quantity should be a positive integer')
      } else {
        newArr[data.index].available_stock = parseInt(data.available_stock)
      }
    }
    if (data.sku) {
      if (data.sku !== '' && !regex.test(data.sku)) {
        toast.error('Sku should be a positive integer')
      } else {
        newArr[data.index].sku = data.sku
      }
    }

    setVariationDetails(newArr)
  }

  const handleSelecetedTags = (items) => {
    // setSelectedTagsArray([...SelectedTagsArray, {}])
  }

  function handleDeletedTags(items) {}

  function removeItemAll(arr, value) {
    var i = 0
    while (i < arr.length) {
      if (arr[i].check === value) {
        arr.splice(i, 1)
      } else {
        ++i
      }
    }
    return arr
  }

  function filterAttributes(arr1, arr2) {
    let array = []
    for (let i = 0; i < arr1.length; i++) {
      array.push({
        name: arr2[i].name,
        options: arr1[i].data,
        position: i + 1,
      })
    }

    return array
  }

  const [CreateProductButtonLoader, setCreateProductButtonLoader] =
    useState(false)
  const handleProductCreate = () => {
    setCreateProductButtonLoader(true)
    let variants = removeItemAll([...VariationDetails], false)
    let attributes = filterAttributes([...SelectedTagsArray], [...VariantNames])

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw
    if (VariantDropDown.value === 'NO') {
      raw = JSON.stringify({
        merchant_user_id: userDetail.id,
        product: {
          title: title,
          description: description,
          category: category,
          tags: PTags,
          is_active: ActiveDropDown.value,
          has_variants: VariantDropDown.value,
          sku: PSku,
          available_stock: parseInt(PAvailableStock),
          price: parseInt(PPrice),
          sale_price: parseInt(PSalePrice),
        },
        images: Images,
      })
    } else if (VariantDropDown.value === 'YES') {
      raw = JSON.stringify({
        merchant_user_id: userDetail.id,
        product: {
          title: title,
          description: description,
          category: category,
          tags: PTags,
          is_active: ActiveDropDown.value,
          has_variants: VariantDropDown.value,
        },
        images: Images,
        attributes: attributes,
        variants: variants,
      })
    }
    const regex = /^[0-9\b]+$/
    if (PSalePrice !== '' && !regex.test(PSalePrice)) {
      toast.error('Sale Price should be a positive integer')
      setCreateProductButtonLoader(false)
    }

    if (PPrice !== '' && !regex.test(PPrice)) {
      toast.error(' Price should be a positive number')
      setCreateProductButtonLoader(false)
    }
    if (PSku !== '' && !regex.test(PSku)) {
      toast.error(' SKU should be a positive number')
      setCreateProductButtonLoader(false)
    }

    if (PAvailableStock !== '' && !regex.test(PAvailableStock)) {
      toast.error('Avaliable stocks should be a positive number')
      setCreateProductButtonLoader(false)
    } else {
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      fetch(
        `${process.env.REACT_APP_API_URL}merchant/products/add`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success && result.success === true) {
            toast.success('Product created successfully!')
            setTimeout(() => {
              navigate('/products')
            }, 1000)
          } else {
            const regex = /Error:(.*)/
            const matchesD = result?.Description?.match(regex)
            const matchesT = result?.Title?.match(regex)
            const matchesC = result?.Category?.match(regex)
            let errorMessage = ''

            if (matchesD) {
              errorMessage = matchesD[1].trim()
              toast.error(errorMessage)
            }
            if (matchesT) {
              errorMessage = matchesT[1].trim()
              toast.error(errorMessage)
            }
            if (matchesC) {
              errorMessage = matchesC[1].trim()
              toast.error(errorMessage)
            }

            toast.error(result.message)
            setCreateProductButtonLoader(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const [Images, setImages] = useState([])
  const handleFileUpload = (event) => {
    getBase64(event.target.files[0], event)
  }

  const getBase64 = (file, e) => {
    return new Promise((resolve) => {
      let fileInfo
      let baseURL = ''
      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result

        let arr = [...Images]
        var strImage = baseURL.replace(/^data:image\/[a-z]+;base64,/, '')

        arr.push({ name: file.name, base64: strImage.toString() })
        setImages(arr)

        resolve(baseURL)
      }
      e.target.value = null
    })
  }

  const deleteProductImage = (index) => {
    let pImages = [...Images]
    pImages.splice(index, 1)

    setImages(pImages)
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        style={{
          minHeight: '100vh',
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item>
          <Typography variant='h2' component='h2'>
            Create New Product
          </Typography>

          <Paper
            sx={{
              width: window.innerWidth > 700 ? '50vw' : '80vw',
              marginTop: '35px',
              paddingY: 12,
              paddingX: 6,
              borderRadius: 2,
            }}
          >
            <Stack spacing={5}>
              <Grid item xs={12}>
                <SharedFormInput
                  label='Product Category'
                  onInputChange={(e) => {
                    setCategory(e)
                  }}
                  value={category}
                  style={{
                    marginBottom: 0,
                    height: 250,
                  }}
                  form={false}
                />
                {/* <SharedMultiSelect
                names={['Men', 'Women', 'Kids']}
                label={'Product Category'}
                onChange={(e) => {
                  if (e.target.value === '1 days') {
                    //setTime(1)
                  }
                  if (e.target.value === '2 days') {
                    //setTime(2)
                  }
                  if (e.target.value === '3 days') {
                    //setTime(3)
                  }
                }}
                multiple={false}
                onSelect={(value) => {
               
                }}
              /> */}
              </Grid>
              <Grid item xs={12}>
                <SharedFormInput
                  label='Title'
                  onInputChange={(e) => setTitle(e)}
                  value={title}
                  style={{
                    marginBottom: 0,
                    height: 250,
                  }}
                  form={false}
                />
              </Grid>
              <Grid item xs={12}>
                <SharedFormInput
                  label='Description'
                  onInputChange={(e) => setDescription(e)}
                  value={description}
                  style={{
                    marginBottom: 0,
                    height: 250,
                  }}
                  multiline={true}
                />
              </Grid>
            </Stack>
          </Paper>

          <Typography variant='h2' component='h2' marginTop={10}>
            Tags
          </Typography>
          <Paper
            sx={{
              paddingY: 12,
              paddingX: 6,
              marginTop: '35px',

              borderRadius: 2,
            }}
          >
            <Stack spacing={5}>
              <Box>
                <Grid item xs={12}>
                  <TagsInput
                    selectedTags={handleSelecetedTags2}
                    fullWidth
                    variant='outlined'
                    id='tags'
                    name='tags'
                    placeholder='Add Tags'
                    label='Options'
                  />
                </Grid>
              </Box>
            </Stack>
          </Paper>

          <Typography variant='h2' component='h2' marginTop={10}>
            Active
          </Typography>
          <Paper
            sx={{
              marginTop: '35px',
              paddingY: 12,
              paddingX: 6,
              borderRadius: 2,
            }}
          >
            <Stack spacing={5}>
              <Box>
                <Grid item xs={12}>
                  <Select
                    id='ActiveDropDown'
                    options={ActiveDropDownOptions}
                    value={ActiveDropDown}
                    onChange={(e) => setActiveDropDown(e)}
                  />
                </Grid>
              </Box>
            </Stack>
          </Paper>

          <Typography variant='h2' component='h2' marginTop={10}>
            Product Image
          </Typography>
          <Paper
            sx={{
              paddingY: 12,
              paddingX: 6,
              marginTop: '35px',
              borderRadius: 2,
            }}
          >
            <Stack spacing={5}>
              <Box
                style={{
                  overflowX: 'auto',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                  }}
                >
                  {Images.map((items, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          position: 'relative',
                          width: '75pt',
                          height: '75pt',
                          marginRight: '20pt',
                        }}
                      >
                        <img
                          color='secondary'
                          variant='contained'
                          component='span'
                          src={'data:image/jpeg;base64, ' + items.base64}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '7px',
                            marginRight: '10pt',
                          }}
                          alt='img'
                        />
                        <img
                          src={TrashIcon}
                          alt='Trash Icon'
                          style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '8pt',
                            bottom: '8pt',
                            backgroundColor: 'white',
                            padding: '2pt',
                            width: '15pt',
                            height: '15pt',
                            borderRadius: '2pt',
                          }}
                          onClick={() => deleteProductImage(index)}
                        />
                      </div>
                    )
                  })}
                  <input
                    ref={inputElement}
                    onChange={handleFileUpload}
                    type='file'
                    style={{ display: 'none' }}
                    // multiple={false}
                  />
                  <div>
                    <img
                      color='secondary'
                      variant='contained'
                      component='span'
                      src={Uploadimg}
                      style={{
                        cursor: 'pointer',
                        width: '75pt',
                        height: '75pt',
                      }}
                      onClick={() => inputElement.current.click()}
                      alt='img'
                    />
                  </div>
                </div>
              </Box>
            </Stack>
          </Paper>

          <Typography variant='h2' component='h2' marginTop={10}>
            <Select
              id='VariantDropDown'
              options={VariantDropDownOptions}
              value={VariantDropDown}
              onChange={(e) => setVariantDropDown(e)}
            />
          </Typography>

          {VariantDropDown.value === 'NO' ? (
            <>
              <Paper
                sx={{
                  marginTop: '35px',
                  paddingY: 12,
                  paddingX: 6,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={5}>
                  <Box>
                    <SharedFormInput
                      label='SKU'
                      onInputChange={(e) => {
                        setPSku(e)
                      }}
                      value={PSku}
                      style={{
                        marginBottom: 0,
                        height: 250,
                      }}
                      form={false}
                    />
                  </Box>
                  <Box>
                    <SharedFormInput
                      label='Available Stock'
                      onInputChange={(e) => setPAvailableStock(e)}
                      value={PAvailableStock}
                      style={{
                        marginBottom: 0,
                        height: 250,
                      }}
                      form={false}
                    />
                  </Box>
                  <Box>
                    <SharedFormInput
                      label='Price'
                      onInputChange={(e) => setPPrice(e)}
                      value={PPrice}
                      style={{
                        marginBottom: 0,
                        height: 250,
                      }}
                      form={false}
                    />
                  </Box>
                  <Box>
                    <SharedFormInput
                      label='Sale Price'
                      onInputChange={(e) => setPSalePrice(e)}
                      value={PSalePrice}
                      style={{
                        marginBottom: 0,
                        height: 250,
                      }}
                      form={false}
                    />
                  </Box>
                </Stack>
              </Paper>
            </>
          ) : (
            <>
              <Paper
                sx={{
                  width: window.innerWidth > 700 ? '50vw' : '80vw',
                  marginTop: '35px',
                  padding: 12,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={5}>
                  <Box sx={{ width: '100%' }}>
                    {SelectedTagsArray.map((value, index) => (
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        style={{ paddingBottom: '19px' }}
                        key={index}
                      >
                        <Grid
                          item
                          xs={2}
                          style={{ paddingTop: '19px', textAlign: 'center' }}
                        >
                          {index + 1}
                        </Grid>
                        <Grid item xs={3}>
                          <SharedFormInput
                            placeholder='Variation Type'
                            onInputChange={(e) => VariantNameHandler(e, index)}
                            style={{ marginBottom: 0 }}
                            form={false}
                            // multiline={true}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <SharedTagsInput
                            selectedTags={handleSelecetedTags}
                            deletedTags={handleDeletedTags}
                            setSelectedTagsArray={setSelectedTagsArray}
                            SelectedTagsArray={SelectedTagsArray}
                            setTotalTagsArray={setTotalTagsArray}
                            TotalTagsArray={TotalTagsArray}
                            setVariationDetails={setVariationDetails}
                            VariationDetails={VariationDetails}
                            indexNo={index}
                            fullWidth
                            variant='outlined'
                            id='tags'
                            name='tags'
                            placeholder='Add Color'
                            label='Options'
                          />
                        </Grid>
                        {SelectedTagsArray.length > 1 ? (
                          <Grid item xs={1} style={{ paddingTop: '19px' }}>
                            <img
                              src={TrashIcon}
                              alt='Trash Icon'
                              style={{ cursor: 'pointer' }}
                              onClick={() => deleteVariant(index)}
                            />
                          </Grid>
                        ) : (
                          ''
                        )}
                      </Grid>
                    ))}
                    {SelectedTagsArray.length < 3 ? (
                      <span
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 600,
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: '#ED2079',

                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedTagsArray([
                            ...SelectedTagsArray,
                            { data: [] },
                          ])
                          setVariantNames([...VariantNames, { name: '' }])
                        }}
                      >
                        Add another variation type
                      </span>
                    ) : (
                      ''
                    )}
                  </Box>
                </Stack>
              </Paper>

              <Typography variant='h2' component='h2' marginTop={10}>
                Variation Details
              </Typography>
              <Paper
                sx={{
                  width: window.innerWidth > 700 ? '50vw' : '80vw',
                  marginTop: '35px',
                  padding: 12,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={5}>
                  <Box sx={{ width: '100%' }}>
                    <div
                      style={{
                        display: window.innerWidth > 700 ? 'flex' : 'grid',
                        justifyContent: 'space-between',
                        background: '#ededed ',
                        borderRadius: '6px',
                        marginBottom: '13px',
                        width: '87%',
                        height: '30px',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        Options
                      </div>
                      <div style={{ paddingRight: '10px' }}>
                        Details (Add price and quantity against each option)
                      </div>
                    </div>
                    {check === true && TotalTagsArray.length !== 0 ? (
                      TotalTagsArray.map((items, index) => {
                        return (
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                            style={{
                              paddingBottom: '19px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Grid
                              item
                              xs={4}
                              style={{
                                paddingTop: '19px',
                                textAlign: 'center',
                                display: 'flex',
                              }}
                            >
                              <Checkbox
                                color='primary'
                                // sx={{
                                //   '&.Mui-checked': {
                                //     color: pink[600],
                                //   },
                                //   paddingLeft: 0,
                                // }}
                                checked={checker(index)}
                                onChange={(e) => {
                                  handleVariationDetails({
                                    checbox: e.target.checked,
                                    index: index,
                                  })
                                }}
                              />

                              <div>
                                <input
                                  id='VariantImage'
                                  onChange={(e) => VariantImageUpload(e)}
                                  type='file'
                                  style={{ display: 'none' }}
                                />
                                <img
                                  color='secondary'
                                  variant='contained'
                                  component='span'
                                  src={checkImage(index)}
                                  style={{
                                    cursor: 'pointer',
                                    height: '40pt',
                                    width: '40pt',
                                  }}
                                  onClick={() => (
                                    UploadImage(), setImageIndex(index)
                                  )}
                                />
                              </div>
                              <Typography style={{ padding: '10px' }}>
                                {' '}
                                {items.map((text, index) => {
                                  if (index === 0) return text
                                  else return ' / ' + text
                                })}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <div style={{ position: 'relative' }}>
                                <small
                                  style={{
                                    position: 'absolute',
                                    top: '4pt',
                                    left: '5pt',
                                  }}
                                >
                                  {Currency}
                                </small>
                                <SharedFormInput
                                  placeholder='Price'
                                  onInputChange={(e) =>
                                    handleVariationDetails({
                                      price: e,
                                      index: index,
                                    })
                                  }
                                  style={{
                                    marginBottom: 0,
                                  }}
                                  type='number'
                                />
                              </div>
                            </Grid>
                            <Grid item xs={2}>
                              <div style={{ position: 'relative' }}>
                                <small
                                  style={{
                                    position: 'absolute',
                                    top: '4pt',
                                    left: '5pt',
                                  }}
                                >
                                  {Currency}
                                </small>
                                <SharedFormInput
                                  placeholder='Sale Price'
                                  onInputChange={(e) =>
                                    handleVariationDetails({
                                      sale_price: e,
                                      index: index,
                                    })
                                  }
                                  style={{
                                    marginBottom: 0,
                                  }}
                                  type='number'
                                />
                              </div>
                            </Grid>
                            <Grid item xs={2}>
                              <SharedFormInput
                                placeholder='Quantity'
                                onInputChange={(e) =>
                                  handleVariationDetails({
                                    available_stock: parseInt(e),
                                    index: index,
                                  })
                                }
                                style={{ marginBottom: 0 }}
                              />
                            </Grid>

                            <Grid item xs={2}>
                              <SharedFormInput
                                placeholder='SKU'
                                onInputChange={(e) =>
                                  handleVariationDetails({
                                    sku: e,
                                    index: index,
                                  })
                                }
                                style={{ marginBottom: 0 }}
                              />
                            </Grid>
                          </Grid>
                        )
                      })
                    ) : (
                      <Box sx={{ my: 10 }}>
                        <p
                          style={{
                            color: 'red',
                            marginTop: '15px',
                            paddingTop: '20px',
                          }}
                        >
                          Some variant fields are empty!
                        </p>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </Paper>
            </>
          )}

          <button
            text='Create Product'
            style={{
              background: '#e93a7d',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '800',
              width: '130px',
              border: 'none',
              height: '36px',
              marginTop: '35pt',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            disabled={CreateProductButtonLoader}
            onClick={handleProductCreate}
          >
            {CreateProductButtonLoader === false ? (
              'Create Product'
            ) : (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ThreeDots
                  height='30'
                  width='30'
                  radius='9'
                  color='white'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClassName=''
                  visible={true}
                />
              </div>
            )}
          </button>
        </Grid>
      </Grid>
    </>
  )
}
export default ProductCreate
