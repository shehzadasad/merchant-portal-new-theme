import { Alert, Grid } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-trello'
import StackBuilderTopRow from './StackBuilderTopRow'
import StackBuilderView from './StackBuilderView'
import AppLoader from '@crema/core/AppLoader'
import { toast } from 'react-toastify'

const StackBuilder = () => {
  const [stacks, setStacks] = useState([])
  const [StackName, setStackName] = useState('')

  const [isLoading, setIsLoading] = useState('1')
  const userDetail = useSelector((state) => state.users.userDetail)
  const fetchStacks = () => {
    setIsLoading('2')
    if (userDetail.id) {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/getAll/stack/${userDetail.merchantId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        timeout: 5000,
      }

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            setIsLoading('3')
            setStacks(response.data.body)
            console.log(response.data.body,"response.data.body");
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const addStack = (data) => {
    setIsLoading('2')
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/add/stack`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          fetchStacks()
          toast.success('Stack Added Successfully!')
          setStackName('')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteStack = (id) => {
    toast.info('Deleting Stack...')

    const config = {
      method: 'delete',
      url:
        `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/delete/stack/` +
        id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          fetchStacks()
          toast.success('Stack Deleted Successfully!')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error('Error!')
      })
  }

  const [StackData, setStackData] = useState('')
  const EditStack = async () => {
    toast.info('Editing Stack...');
  
    const axios = require('axios');
  
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}ms-merchant-portal/payment/update/stack`,
        {
          ...StackData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        fetchStacks();
        toast.success('Stack Edited Successfully!');
        console.log(StackData,"StackData.isEnabled");
      }
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  };

  useEffect(() => {
    fetchStacks()
  }, [userDetail.id])

  return isLoading === '1' ? (
    <AppLoader />
  ) : (
    <Container style={{ padding: 0, maxWidth: '100%', margin: 0 }}>
      <br />
      <br />
      <StackBuilderTopRow
        StackName={StackName}
        setStackName={setStackName}
        disabled={stacks.length < 3 ? false : true}
        addStack={() => {
          const object = {
            id: null,
            name: StackName,
            userId: userDetail.id,
            isEnabled: true,
            stackViewDtoList: [],
          }
          addStack(object)
          setStacks([...stacks, object])
        }}
      />

      {isLoading === '2' ? (
        <div style={{ paddingTop: '50%' }}>
          <AppLoader />
        </div>
      ) : (
        <Grid
          container
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {stacks.map((stack, index) => {
            if (index < 3)
              return (
                <Grid item key={stack.id}>
                  <StackBuilderView
                    data={stack}
                    index={index + 1}
                    deleteStack={deleteStack}
                    fetchStacks={fetchStacks}
                    EditStack={EditStack}
                    setStackData={setStackData}
                    StackData={StackData}
                  />
                </Grid>
              )
          })}
        </Grid>
      )}
    </Container>
  )
}
export default StackBuilder
