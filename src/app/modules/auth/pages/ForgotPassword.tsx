import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import TextInput from '../../../../components/TextInput'
import Button from '../../../../components/Button'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      setTimeout(() => {
        // requestPassword(values.email)
        //   .then(({data: {result}}) => {
        //    setHasErrors(false)
        //    setLoading(false)
        //   })
        //   .catch(() => {
        //     setHasErrors(true)
        //     setLoading(false)
        //     setSubmitting(false)
        //     setStatus('The login detail is incorrect')
        //   })

        //dummy data
        if(values.email === 'test1@gmail.com') {
          setHasErrors(false)
          setLoading(false)
        } else {
          setHasErrors(true)
          setLoading(false)
          setSubmitting(false)
          setStatus('The login detail is incorrect')
        }
      }, 1000)
    },
  })

  return (
    <>
      <form
        className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        noValidate
        id="kt_login_password_reset_form"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center mb-10">
          {/* begin::Title */}
          <h1 className="text-dark mb-3">Forgot Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className="text-gray-400 fw-bold fs-4">
            Enter your email to reset your password.
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">
              Sorry, looks like there are some errors detected, please try
              again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className="mb-10 bg-light-info p-8 rounded">
            <div className="text-info">
              Sent password reset. Please check your email
            </div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className="fv-row mb-10">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            Email
          </label>
          <TextInput
            data-testid="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            formcontrol={"solid"}
            // isvalid={formik.touched.email && !formik.errors.email}
            name="email"
            autoComplete="off"
            id="fpassword-email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="fv-plugins-message-container">
              <div>
                <span role="alert">{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="d-flex flex-wrap justify-content-center pb-lg-0">
          <Button
            type="submit"
            id="fpassword-submit"
            btnlg='primary'
            cName="fw-bolder me-4"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <span className="indicator-label">Submit</span>
            {loading && (
              <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </Button>
          <Link to="/auth/login">
            <Button
              type="button"
              id="fpassword-cancel"
              btnlg='light-primary'
              cName="fw-bolder"
            >
              Cancel
            </Button>
          </Link>{" "}
        </div>
        {/* end::Form group */}
      </form>
    </>
  );
}
