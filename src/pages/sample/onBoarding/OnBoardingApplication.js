import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import UploadBussinessDocuments from './UploadBussinessDocuments'
import BussinessInformationForm from './BussinessInformationForm'
import ContactInformationFrom from './ContactInformationFrom'
import ReviewTable from './ReviewTable'
import OnBoardingApplicationSubmission from './OnBoardingApplicationSubmission'
import OnBoardingProgress from './OnBoardingProgress'

const OnBoardingApplication = () => {
  const [onBoardingData, setOnBoardingData] = useState([])
  const [reviewPage, setReviewPage] = useState(false)
  const [formPart, setFormPart] = useState('')
  const [percentage, setPercentage] = useState(null)
  const userDetail = useSelector((state) => state.users.userDetail)
  const [S3url, setS3url] = useState([])
  const [directorList, setDirectorList] = useState([])

  useEffect(() => {
    setFormPart('BussinessInformation')
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/merchants/banner/percentage/${userDetail?.merchantId}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }

    axios(config)
      .then(function (response) {
        setPercentage(response.data.body)

        if (response.data.body.merchantBusinessInformation === 100) {
          setFormPart('Contact')
        }
        if (response.data.body.merchantContactInformation === 100) {
          setFormPart('CertificateUpload')
        }
        if (response.data.body.merchantDocumentsUpload === 100) {
          setFormPart('CertificateUpload')
        } else {
          setFormPart('BussinessInformation')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  const addDirector = (val) => {
    setDirectorList([
      ...directorList,
      {
        name: val.name,
        designation: val.designation,
        cnic: val.cnic,
      },
    ])
  }

  const returnSchema = Yup.object().shape({
    businessName: Yup.string(),
    cnic: Yup.number().min(13, 'Must be exactly 13 digits'),
    businessEmail: Yup.string().email('invali email'),
    signatoryEmail: Yup.string().email('invali email'),
    supportEmail: Yup.string().email('invali email'),
  })

  var str2bool = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true
      if (value.toLowerCase() === 'false') return false
    }
    return value
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      businessName: onBoardingData?.merchantBusinessInformation?.businessName,
      businessRegisteredName:
        onBoardingData?.merchantBusinessInformation?.businessRegisteredName,
      parentCompany: onBoardingData?.merchantBusinessInformation?.parentCompany,
      ntn: onBoardingData?.merchantBusinessInformation?.ntn,
      strn: onBoardingData?.merchantBusinessInformation?.strn,
      businessAddress:
        onBoardingData?.merchantBusinessInformation?.businessAddress,
      businessType: onBoardingData?.merchantBusinessInformation?.businessType,
      dateOfIncorporation:
        onBoardingData?.merchantBusinessInformation?.dateOfIncorporation,
      businessIndustry: [],
      state: onBoardingData?.merchantBusinessInformation?.state,
      zipCode: onBoardingData?.merchantBusinessInformation?.zipCode,
      country: onBoardingData?.merchantBusinessInformation?.country,
      businessEmail: onBoardingData.merchantBusinessInformation?.businessEmail,
      businessPhone: onBoardingData?.merchantBusinessInformation?.businessPhone,
      businessWebsiteURL:
        onBoardingData?.merchantBusinessInformation?.businessWebsiteURL,
      businessVolume:
        onBoardingData?.merchantBusinessInformation?.businessVolume,
      cnic: onBoardingData?.merchantBusinessInformation?.cnic,
      city: onBoardingData?.merchantBusinessInformation?.city,
      fbAccURL: onBoardingData?.merchantBusinessInformation?.fbAccURL,
      instaAccURL: onBoardingData?.merchantBusinessInformation?.instaAccURL,
      linkedInAccURL:
        onBoardingData?.merchantBusinessInformation?.linkedInAccURL,
      authorizedSignatoryName:
        onBoardingData?.merchantContactInformation?.authorizedSignatoryName,
      signatoryEmail:
        onBoardingData?.merchantContactInformation?.signatoryEmail,
      signatoryPhone:
        onBoardingData?.merchantContactInformation?.signatoryPhone,
      signatoryDoB: onBoardingData?.merchantContactInformation?.signatoryDoB,
      supportPhone: onBoardingData?.merchantContactInformation?.supportPhone,
      supportEmail: onBoardingData?.merchantContactInformation?.supportEmail,
      iban: onBoardingData?.merchantBankInformation?.iban,
      accTitle: onBoardingData?.merchantBankInformation?.accTitle,
      bankName: onBoardingData?.merchantBankInformation?.bankName,
      bankBranch: onBoardingData?.merchantBankInformation?.bankBranch,
      name: '',
      hasPhysicalStore:
        onBoardingData?.merchantBusinessInformation?.hasPhysicalStore || false,
      designation: '',
      supportName: onBoardingData?.merchantContactInformation?.supportName,
      signatoryGender:
        onBoardingData?.merchantContactInformation?.signatoryGender,
    },
    validationSchema: returnSchema,
    onSubmit: (values) => {
      var hasPhysicalStore1 = str2bool(values.hasPhysicalStore)

      // setSuccess(false)

      // if (success) {

      // }
      if (formPart === 'BussinessInformation') {
        setFormPart('Contact')
      }
      if (formPart === 'Contact') {
        setFormPart('CertificateUpload')
      }
      if (formPart === 'CertificateUpload') {
        setReviewPage(true)
      }
    },
  })

  return (
    <>
      {!reviewPage ? (
        <Box>
          {formPart === 'BussinessInformation' ? (
            <BussinessInformationForm setFormPart={setFormPart} />
          ) : formPart === 'Contact' ? (
            <>
              <ContactInformationFrom setFormPart={setFormPart} />
            </>
          ) : formPart === 'CertificateUpload' ? (
            <UploadBussinessDocuments
              setS3url={setS3url}
              S3url={S3url}
              setFormPart={setFormPart}
            />
          ) : formPart === 'review-table' ? (
            <ReviewTable setFormPart={setFormPart} />
          ) : formPart === 'submission-succesful' ? (
            <OnBoardingApplicationSubmission />
          ) : formPart === 'onBoarding-progress' ? (
            <OnBoardingProgress setFormPart={setFormPart} />
          ) : (
            ''
          )}
        </Box>
      ) : (
        <Box display='flex' flexDirection='column' alignItems={'center'}>
          {/* <ReviewTable setReviewPage={setReviewPage} formData={formData} />{' '} */}
        </Box>
      )}
    </>
  )
}

export default OnBoardingApplication
