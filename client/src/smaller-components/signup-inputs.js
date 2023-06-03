
export function SignupInputs({ formik, id, label, icon, type, name }) {
    // made a separate reusable component for inputs used in Signup page

  return (
    <div className="d-flex flex-row align-items-center mb-4">
      <div className="form-outline flex-fill mb-0">
        <label className="form-label ms-5" htmlFor={id}>{label}</label>
        <div className=' d-flex align-items-center mx-2'>
          <i className={`fas ${icon} fa-lg me-3 fa-fw`}></i>
          <div className="form-outline flex-fill mb-0">
          <input type={type} id={id} name={name} className="form-control login-signup-inputs" autoComplete='off' onChange={formik.handleChange} />
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}