import React, { useEffect, useRef, useState } from 'react'
import { Typography, Box, Grid, Button } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import _ from 'lodash'

import {
  addOnBoardingDocument,
  getOnBoardingDetails,
} from 'redux/actions/OnBoardingAction'
import { useDispatch, useSelector } from 'react-redux'
import { ThreeDots } from 'react-loader-spinner'
const UploadBussinessDocuments = ({ setFormPart }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const userDetail = useSelector((state) => state.users.userDetail)
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(null)
  const inputElement = useRef(null)
  const inputElementAgreement = useRef(null)
  const inputElementNtnCertificate = useRef(null)
  const inputElementFrontCnic = useRef(null)
  const inputElementBackCnic = useRef(null)
  const inputElementBankAccountMaintaince = useRef(null)
  const inputElementBusinessLogo = useRef(null)
  const inputElementProofOfBusinessAddress = useRef(null)
  const [
    merchantAgreementCertificateS3URL,
    setMerchantAgreementCertificateS3URL,
  ] = useState('')
  const [ntnCertificateS3URL, setNtnCertificateS3URL] = useState('')
  const [cnicFrontS3URL, setCnicFrontS3URL] = useState('')
  const [cnicBackS3URL, setCnicBackS3URL] = useState('')
  const [
    bankAccMaintenanceCertificateS3URL,
    setBankAccMaintenanceCertificateS3URL,
  ] = useState('')
  const [businessLogoS3URL, setBusinessLogoS3URL] = useState('')
  const [featuredImageS3URL, setFeaturedImagS3URL] = useState('')
  const [proofOfBusinessAddressS3URL, setProofOfBusinessAddressS3URL] =
    useState('')
  const [onBoardingData, setOnBoardingData] = useState([])
  let arr2 = []
  const handleFileUpload = (event, key) => {
    arr2.push(event.target.files[0])
    let formData = new FormData()
    formData.append('files', event.target.files[0])
    var formdata = new FormData()
    _.forEach(event.target.files, (file) => {
      formData.append('files', file)
    })

    formdata.append(
      'files',
      new Blob(
        [
          {
            lastModified: arr2.lastModified,
            lastModifiedDate: arr2.lastModifiedDate,
            name: arr2.name,
            size: arr2.size,
            type: arr2.type,
            webkitRelativePath: arr2.webkitRelativePath,
          },
        ],
        { type: 'application/json' }
      )
    )

    formdata.append(
      'bucket-name',
      key === 'BussinessLogo'
        ? 'merchants/logos/'
        : key === 'BussinessLogo'
        ? key === 'merchants/thumbnails/'
        : 'merchants/onboarding/certificates'
    )

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      `${process.env.REACT_APP_API_URL}ms-web-external-apis/file/upload/image`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (key === 'marchantAgreement') {
          setMerchantAgreementCertificateS3URL(result.body[0])
        }
        if (key === 'ntnCertificate') {
          setNtnCertificateS3URL(result.body[0])
        }
        if (key === 'frontCNIC') {
          setCnicFrontS3URL(result.body[0])
        }
        if (key === 'rareCNIC') {
          setCnicBackS3URL(result.body[0])
        }
        if (key === 'maintainenceCertificate') {
          setBankAccMaintenanceCertificateS3URL(result.body[0])
        }
        if (key === 'BussinessLogo') {
          setBusinessLogoS3URL(result.body[0])
        }
        if (key === 'featureImage') {
          setFeaturedImagS3URL(result.body[0])
        }
        if (key === 'proofOfBusinessAddress') {
          setProofOfBusinessAddressS3URL(result.body[0])
        }
      })

      .catch((error) => console.log('error', error))
  }
  const handleSubmit = () => {
    const data = {
      id: onBoardingData?.id,
      merchantId: userDetail.merchantId,
      merchantDocumentsUpload: {
        merchantAgreementCertificateURL: merchantAgreementCertificateS3URL,
        ntnCertificateURL: ntnCertificateS3URL,
        cnicFrontURL: cnicFrontS3URL,
        cnicBackURL: cnicBackS3URL,
        bankAccMaintenanceCertificateURL: bankAccMaintenanceCertificateS3URL,
        businessLogoURL: businessLogoS3URL,
        featuredImageURL: featuredImageS3URL,
        proofOfBusinessAddressURL: proofOfBusinessAddressS3URL,
      },
    }
    setSuccess(false)
    dispatch(addOnBoardingDocument(data, setSuccess))

    setFormPart('review-table')
  }
  useEffect(() => {
    dispatch(getOnBoardingDetails(userDetail?.merchantId, setOnBoardingData))
  }, [])
  return (
    <React.Fragment>
      <Box
        display='flex'
        alignItems={'center'}
        flexDirection='column'
        marginTop={'30px'}
      >
        <Typography fontSize={'24px'} paddingBottom='6px' marginLeft={'12px'}>
          Merchant Onboarding Application
        </Typography>
        <Typography
          width={isSm ? '700px' : '300px'}
          sx={{ marginBottom: '20px' }}
        >
          Please make sure, all information is correct and updated. You can’t
          edit it later. Only QisstPay can update it on request from merchant.
        </Typography>
        <Box bgcolor={'#fff'} width={isSm ? '700px' : '300px'} padding={'30px'}>
          <Typography fontSize={'18px'}> Upload Business Documents</Typography>
          <Typography marginBottom={'25px'}>
            Kindly upload latest scanned copy of original documents. Make sure
            it’s not blur and corners are clearly visible.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography>Signed Merchant Agreement</Typography>
              <input
                ref={inputElementAgreement}
                onChange={(e) => handleFileUpload(e, 'marchantAgreement')}
                type='file'
                style={{ display: 'none' }}
                multiple={false}
              />
              <Box>
                <Button
                  color='secondary'
                  variant='outlined'
                  component='span'
                  onClick={() => inputElementAgreement.current.click()}
                  style={{ color: '#E72E80', marginTop: '10px' }}
                >
                  Upload Certificate
                </Button>
              </Box>

              {merchantAgreementCertificateS3URL && (
                <Box>
                  <Typography color={'green'} padding={'5px'}>
                    Filename: {merchantAgreementCertificateS3URL}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography>Business NTN Certificate</Typography>
              <input
                ref={inputElementNtnCertificate}
                onChange={(e) => handleFileUpload(e, 'ntnCertificate')}
                type='file'
                style={{ display: 'none' }}
                multiple={false}
              />
              <Box>
                <Button
                  color='secondary'
                  variant='outlined'
                  component='span'
                  onClick={() => inputElementNtnCertificate.current.click()}
                  alt='img'
                  style={{ color: '#E72E80', marginTop: '10px' }}
                >
                  Upload Certificate
                </Button>
              </Box>
              {ntnCertificateS3URL && (
                <Box>
                  <Typography color={'green'} padding={'5px'}>
                    Filename: {ntnCertificateS3URL}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} display='grid'>
              <Typography>
                CNIC # of Authorized Signatory (Attach Front & Rear Copy of
                CNIC)
              </Typography>
              <Box display='flex'>
                <Grid item xs={12}>
                  <input
                    ref={inputElementFrontCnic}
                    onChange={(e) => handleFileUpload(e, 'frontCNIC')}
                    type='file'
                    style={{ display: 'none' }}
                    multiple={false}
                  />
                  <Box>
                    <Button
                      color='secondary'
                      variant='outlined'
                      component='span'
                      onClick={() => inputElementFrontCnic.current.click()}
                      alt='img'
                      style={{ color: '#E72E80', marginTop: '10px' }}
                    >
                      Front Side CNIC
                    </Button>
                  </Box>
                  {cnicFrontS3URL && (
                    <Box>
                      <Typography color={'green'} padding={'5px'}>
                        Filename: {cnicFrontS3URL}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <input
                    ref={inputElementBackCnic}
                    onChange={(e) => handleFileUpload(e, 'rareCNIC')}
                    type='file'
                    style={{ display: 'none' }}
                    multiple={false}
                  />
                  <Box>
                    <Button
                      color='secondary'
                      variant='outlined'
                      component='span'
                      onClick={() => inputElementBackCnic.current.click()}
                      alt='img'
                      style={{ color: '#E72E80', marginTop: '10px' }}
                    >
                      Rear side cnic
                    </Button>
                  </Box>
                  {cnicBackS3URL && (
                    <Box>
                      <Typography color={'green'} padding={'5px'}>
                        Filename: {cnicBackS3URL}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography>Bank Account Maintainence Certificate</Typography>
              <input
                ref={inputElementBankAccountMaintaince}
                onChange={(e) => handleFileUpload(e, 'maintainenceCertificate')}
                type='file'
                style={{ display: 'none' }}
                multiple={false}
              />
              <Box>
                <Button
                  color='secondary'
                  variant='outlined'
                  component='span'
                  onClick={() =>
                    inputElementBankAccountMaintaince.current.click()
                  }
                  alt='img'
                  style={{ color: '#E72E80', marginTop: '10px' }}
                >
                  Upload Certificate
                </Button>
              </Box>
              {bankAccMaintenanceCertificateS3URL && (
                <Box>
                  <Typography color={'green'} padding={'5px'}>
                    Filename: {bankAccMaintenanceCertificateS3URL}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Business Logo</Typography>
              <Typography color='#6B7280' fontSize={'12px'}>
                Upload high quality trasparent logo. It will appear in QisstPay
                App and website
              </Typography>
              <input
                ref={inputElementBusinessLogo}
                onChange={(e) => handleFileUpload(e, 'BussinessLogo')}
                type='file'
                style={{ display: 'none' }}
                multiple={false}
              />
              <Box>
                <Button
                  color='secondary'
                  variant='outlined'
                  component='span'
                  onClick={() => inputElementBusinessLogo.current.click()}
                  alt='img'
                  style={{ color: '#E72E80', marginTop: '10px' }}
                >
                  Upload Logo
                </Button>
              </Box>
              {businessLogoS3URL && (
                <Box>
                  <Typography color={'green'} padding={'5px'}>
                    Filename: {businessLogoS3URL}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Featured Image</Typography>
              <Typography color='#6B7280' fontSize={'12px'}>
                Upload minimum 500x400 px image. It will appear in QisstPay App
                and website
              </Typography>

              <input
                ref={inputElementProofOfBusinessAddress}
                onChange={(e) => handleFileUpload(e, 'featureImage')}
                type='file'
                style={{ display: 'none' }}
                multiple={false}
              />
              <Box>
                <Button
                  color='secondary'
                  variant='outlined'
                  component='span'
                  onClick={() =>
                    inputElementProofOfBusinessAddress.current.click()
                  }
                  alt='img'
                  style={{ color: '#E72E80', marginTop: '10px' }}
                >
                  Upload Image
                </Button>
              </Box>
              {featuredImageS3URL && (
                <Box>
                  <Typography color={'green'} padding={'5px'}>
                    Filename: {featuredImageS3URL}iqra
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Proof Of Business Address(Upload Bill)</Typography>

              <input
                ref={inputElement}
                onChange={(e) => handleFileUpload(e, 'proofOfBusinessAddress')}
                type='file'
                style={{ display: 'none' }}
                multiple={false}
              />
              <Box>
                <Button
                  color='secondary'
                  variant='outlined'
                  component='span'
                  onClick={() => inputElement.current.click()}
                  alt='img'
                  style={{ color: '#E72E80', marginTop: '10px' }}
                >
                  Upload Image
                </Button>
              </Box>
              {proofOfBusinessAddressS3URL && (
                <Box>
                  <Typography color={'green'} padding={'5px'}>
                    Filename: {proofOfBusinessAddressS3URL}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box
          display='flex'
          justifyContent={'space-between'}
          width={isSm ? '750px' : '300px'}
        >
          <Box>
            <Button
              variant='outlined'
              style={{
                borderRadius: '8px',
                color: '#e93a7d',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '150px',
                border: '1px solid #e93a7d',
                height: '40px',
                cursor: 'pointer',
                marginRight: 17,
                marginTop: 20,
              }}
              onClick={() => {
                setFormPart('Contact')
              }}
            >
              Back
            </Button>
          </Box>
          <Box>
            <Button
              variant='outlined'
              style={{
                // background: '#',
                borderRadius: '8px',
                color: '#e93a7d',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '150px',
                border: '1px solid #e93a7d',
                height: '40px',
                cursor: 'pointer',
                marginRight: 17,
                marginTop: 20,
              }}
              onClick={() => {
                setFormPart('onBoarding-progress')
              }}
            >
              Save & Close
            </Button>
            <Button
              variant='outlined'
              style={{
                // background: '#',
                borderRadius: '8px',
                color: '#e93a7d',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                width: '160px',
                border: '1px solid #e93a7d',
                height: '40px',
                cursor: 'pointer',
                marginRight: 17,
                marginTop: 20,
              }}
              type='submit'
              onClick={handleSubmit}
            >
              {success === false ? (
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
              ) : (
                'Save & Continue'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default UploadBussinessDocuments
