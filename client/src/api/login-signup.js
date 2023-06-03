import axios from 'axios'
import { BackendURL } from '../config'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';


const signupAPI = async (values, navigate) => {
  const toastId = toast.loading('Loading...')
  // showing the "loading" toast

  try {
    const response = await axios.post(`${BackendURL}/signup`, values)
    console.log(response)
    toast.success('Registered Successfully', { id: toastId })
    // updating the loading toast to success

    setTimeout(() => {
      navigate('/login')
    }, "1000")
    // navigate to login after 1 second

  } catch (err) {
    if (err?.response?.status === 400) {
      toast.error(err?.response?.data?.message, { id: toastId })
    } else {
      toast.error('Network Error', { id: toastId })
    }
  }
}

const loginAPI = async (values, navigate) => {
  const toastId = toast.loading('Loading...')

  try {
    const response = await axios.post(`${BackendURL}/login`, values)
    const data = response?.data
    Cookies.set('jwtToken', data?.jwtToken, { expires: 7 })
    Cookies.set('loggedIn', true, {expires: 7})
    toast.success('Logged In', { id: toastId })
    setTimeout(() => {
      navigate('/');
    }, "1000");
  } catch (err) {
    if (err?.response?.status === 400) {
      toast.error('invalid email or password', { id: toastId })
    } else {
      toast.error('Network Error', { id: toastId })
    }
  }

}

export { signupAPI, loginAPI }