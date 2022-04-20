import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import TextInput from '../../../../styles/components/TextInput'
import Button from '../../../../styles/components/Button'
import { useTranslation } from 'react-i18next'

const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("ForgotPassword.Error.Email")
    .required("ForgotPassword.Error.EmailEntry"),
});

export function ForgotPassword() {
  const { t } = useTranslation();
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
          setStatus(`${t("Login.Notif.IncorrectUser")}`);
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
          <h1 className="text-dark mb-3">{t("ForgotPassword.Info.Header")}</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className="text-gray-400 fw-bold fs-4">
            {t("ForgotPassword.Info.EmailEntry")}
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">
              {t("ForgotPassword.Notif.Error")}
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className="mb-10 bg-light-info p-8 rounded">
            <div className="text-info">
              {t("ForgotPassword.Notif.URLSent")}
            </div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className="fv-row mb-10">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            {t("ForgotPassword.Input.Email")}
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
                <span role="alert">{t(`${formik.errors.email}`)}</span>
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
            btnlg="primary"
            cName="fw-bolder me-4"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <span className="indicator-label">
              {t("ForgotPassword.Button.Submit")}
            </span>
            {loading && (
              <span className="indicator-progress">
                {t("Login.Button.Loading")}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </Button>
          <Link to="/auth/login">
            <Button
              type="button"
              id="fpassword-cancel"
              btnlg="light-primary"
              cName="fw-bolder"
            >
              {t("ForgotPassword.Button.Cancel")}
            </Button>
          </Link>{" "}
        </div>
        {/* end::Form group */}
      </form>
    </>
  );
}
