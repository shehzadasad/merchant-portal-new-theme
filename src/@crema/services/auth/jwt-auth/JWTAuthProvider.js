import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes'
import jwtAxios, { setAuthToken } from './index'

const JWTAuthContext = createContext()
const JWTAuthActionsContext = createContext()

export const useJWTAuth = () => useContext(JWTAuthContext)

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext)

const JWTAuthAuthProvider = ({ children }) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        })
        return
      }
      setAuthToken(token)
      const tokenDecodedData = jwt_decode(token)

      setJWTAuthData({
        user: {
          email: tokenDecodedData.sub,
          id: tokenDecodedData.user_id,
        },
        isLoading: false,
        isAuthenticated: true,
      })
    }

    getAuthUser()
  }, [])

  const signInUser = async ({ email, password }) => {
    dispatch({ type: FETCH_START })
    try {
      const { data } = await jwtAxios.post('', { email, password })
      setAuthToken(data.token)
      dispatch({ type: FETCH_SUCCESS })
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      })
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      })
    }
  }

  const signUpUser = async ({ name, email, password }) => {
    dispatch({ type: FETCH_START })
    try {
      const { data } = await jwtAxios.post('users', {
        name,
        email,
        password,
      })
      setAuthToken(data.token)

      dispatch({ type: FETCH_SUCCESS })
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      })
      console.log('error:', error.response.data.error)
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      })
    }
  }

  const logout = async () => {
    localStorage.clear()
    setAuthToken()
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  )
}
export default JWTAuthAuthProvider

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
