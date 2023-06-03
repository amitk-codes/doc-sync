import React from 'react'
import { useFormik } from "formik"
import { LoginInputs } from '../smaller-components/login-inputs'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import { loginAPI } from '../api/login-signup'

const Login = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    // used formik package to handle forms efficiently
    initialValues: { email: '', password: '' }
  })
  return (
    <div className='container login-div d-flex flex-column align-items-center'>
      <Toaster
        // for react-toasts
        position="top-right"
        reverseOrder={false}
      />
      <div>
        <h1 className='my-4'>Doc Sync</h1>
      </div>
      <div className='login-signup-form rounded-4'>
        <form className="mx-1 mx-md-4 pb-4">
          <p className="text-center text-white h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pt-5">Login</p>

          <LoginInputs formik={formik}
            id='login-email'
            label='Your Email'
            icon='fa-envelope'
            type='email' />

          <LoginInputs formik={formik}
            id='login-password'
            label='Password'
            icon='fa-lock'
            type='password' />

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button
              className="login-signup-btn"
              type="button"
              onClick={() => loginAPI(formik?.values, navigate)}>
              Login
            </button>
          </div>
          <p className=' text-center'>
            Don't have an account? <span className='text-white login-signup-span' onClick={() => navigate('/signup')}>Sign Up</span>
          </p>

        </form>
      </div>



    </div>
  )
}

export { Login }