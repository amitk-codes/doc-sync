import React from 'react'
import { useFormik } from "formik"
import { SignupInputs } from '../smaller-components/signup-inputs'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup'
import { signupAPI } from '../api/login-signup'


const signupSchema = Yup.object().shape({
  // integrated yup with formik for form validations
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
})

const Signup = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    // used formik to handle react forms efficiently
    initialValues: { name: '', email: '', password: '' },
    onSubmit: ((values) => {
      signupAPI(values, navigate)

    }),
    validationSchema: signupSchema
  })
  return (
    <div className='container login-signup-div d-flex flex-column align-items-center mb-5'>

      <Toaster
        // for react-toasts
        position="top-right"
        reverseOrder={false}
      />

      <div>
        <h1 className='my-4'>Doc Sync</h1>
      </div>
      <div className='login-signup-form rounded-4'>
        <form className="mx-1 mx-md-4 pb-4" onSubmit={formik.handleSubmit}>
          <p className="text-center text-white h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pt-5">Signup</p>

          <SignupInputs formik={formik}
            name='name'
            id='signup-name'
            label='Your Name'
            icon='fa-user'
            type='text' />

          <SignupInputs formik={formik}
            name='email'
            id='signup-email'
            label='Email'
            icon='fa-envelope'
            type='text' />

          <SignupInputs formik={formik}
            name='password'
            id='signup-password'
            label='Password'
            icon='fa-lock'
            type='password' />

          <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3">
            <button
              type="submit"
              className="login-signup-btn"
            >
              Sign Up
            </button>
          </div>

          <p className=' text-center'>Already have an account? <span className='text-white login-signup-span' onClick={() => navigate('/login')}>Login In</span> </p>

        </form>
      </div>

    </div>
  )
}

export { Signup }