import axios from 'axios'

const jwtAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}ms-user-authentication/user/auth/login`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
})
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    return err
  }
)
export const setAuthToken = (token) => {
  if (token) {
    // if (token.length > 9) {
    //   jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    //   localStorage.setItem('token', token)
    // }
  } else {
    // delete jwtAxios.defaults.headers.common['Authorization']
    // localStorage.removeItem('token')
  }
}

export default jwtAxios
