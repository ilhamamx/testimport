/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { useTranslation } from "react-i18next";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "admin@demo.com",
  password: "demo",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        //   login(values.email, values.password)
        //     .then(({data: {api_token}}) => {
        //       setLoading(false)
        //       dispatch(auth.actions.login(api_token))
        //     })
        //     .catch(() => {
        //       setLoading(false)
        //       setSubmitting(false)
        //       setStatus('The login detail is incorrect')
        //     })
      }, 1000);
    },
  });

  function emailValidation() {
    const isInvalid = formik.touched.email && formik.errors.email;
    const isValid = formik.touched.email && !formik.errors.email;
    if (isValid) {
      return `is-valid`;
    }
    if (isInvalid) {
      return `is-invalid`;
    }
    return `is-valid`;
  }

  function passwordValidation() {
    const isInvalid = formik.touched.password && formik.errors.password;
    const isValid = formik.touched.password && !formik.errors.password;
    if (isValid) {
      return `is-valid`;
    }
    if (isInvalid) {
      return `is-invalid`;
    }
    return `is-valid`;
  }

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {/* begin::Heading */}
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">{t("Login.Info.SignIn")}</h1>
        <div className="text-gray-400 fw-bold fs-4">
          {t("Login.Info.Registration")}
          <Link to="/auth/registration" className="link-primary fw-bolder">
            {t("Login.Link.Registration")}
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : (
        <div className="mb-10 bg-light-info p-8 rounded">
          <div className="text-info">
            Use account <strong>admin@demo.com</strong> and password{" "}
            <strong>demo</strong> to continue.
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <label className="form-label fs-6 fw-bolder text-dark">Email or No. Handphone</label>
        <Input
          data-testid="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          formcontrol={"solid"}
          isvalid={`${emailValidation()}`}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div
            data-testid="emailerror"
            className="fv-plugins-message-container"
          >
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <div className="d-flex justify-content-between mt-n5">
          <div className="d-flex flex-stack mb-2">
            {/* begin::Label */}
            <label className="form-label fw-bolder text-dark fs-6 mb-0">
              Password
            </label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to="/auth/forgot-password"
              className="link-primary fs-6 fw-bolder"
              style={{ marginLeft: "5px" }}
            >
              {t("Login.Link.ForgotPassword")}
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <Input
          data-testid="password"
          type="password"
          autoComplete="off"
          formcontrollg="solid"
          {...formik.getFieldProps("password")}
          formcontrol={"solid"}
          isvalid={`${passwordValidation()}`}
        />
        {formik.touched.password && formik.errors.password && (
          <div
            data-testid="passworderror"
            className="fv-plugins-message-container"
          >
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className="text-center">
        {/* <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button> */}
        <Button
          id="kt_sign_in_submit"
          btnlg="primary"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </Button>
      </div>
      {/* end::Action */}
    </form>
  );
}
